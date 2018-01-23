'use strict';

const Generator = require('yeoman-generator');
const cloudFormationTemplate = require('../../lib/cloudformation_template');
const { withCloudFormationTemplates } = require('../../lib/cloudformation_template/yeoman');
const { omit, takeRight, head } = require('lodash');

const {
  apiGatewayDeployment,
  apiGatewayMethod,
  apiGatewayResource,
  apiGatewayRestApi,
  lambdaPermission
} = require('../../lib/cloudformation_template/resources');

const {
  handlerResourceName,
  restApiName,
  restApiDeploymentName,
  restApiCollectionPathName,
  restApiMemberPathName,
  restApiMethodName,
  restApiLambdaPermissionName,
  restApiHumanReadableName,
  restApiCollectionPathPart,
  restApiMemberPathPart,
  restApiCollectionPathMatcher,
  restApiMemberPathMatcher,
  restApiUrlName
} = require('../../conventions');

const STAGE = 'dev';

function getParentResourceName(through = '') {
  const throughChain = through.split('.');
  const [throughResource, throughKey] = takeRight(throughChain, 2);

  if (throughResource && throughKey) {
    return restApiMemberPathName(throughResource);
  } else if (throughResource) {
    return restApiCollectionPathName(throughResource);
  } else {
    return undefined;
  }
}

function getRoutePrefix(through = '') {
  const throughChain = through.split('.');

  if (!head(throughChain)) {
    return;
  }

  return throughChain.map((value, index) => {
    if (index % 2 === 0) {
      return value;
    } else {
      return '*';
    }
  }).join('/');
}

module.exports = class extends withCloudFormationTemplates(Generator) {
  constructor(args, opts) {
    super(args, opts);

    this.argument('resource', {
      type: String,
      required: true
    });

    this.argument('method', {
      type: String,
      required: true
    });

    this.argument('handler', {
      type: String,
      required: true
    });

    this.option('member', {
      type: String,
      default: undefined
    });

    this.option('through', {
      type: String
    });
  }

  updateCloudFormationTemplate() {
    const { resource, method, handler, member, through } = this.options;

    const type = member ? 'member' : 'collection';
    const key = (member == 'true') ? undefined : member;

    // const [throughResource, throughKey] = takeRight((through || '').split('.'), 2);

    const resourceApiName = restApiName();
    const resourceDeploymentName = restApiDeploymentName();
    const resourceCollectionPathName = restApiCollectionPathName(resource);
    const resourceMemberPathName = restApiMemberPathName(resource);
    const resourceName = restApiMethodName(resource, method, type);
    const resourcePermissionName = restApiLambdaPermissionName(resource, method, type);
    const resourceHandlerName = handlerResourceName(resource, handler);
    const resourceApiUrlName = restApiUrlName();

    const allResources = {
      [resourceApiName]: apiGatewayRestApi({
        name: restApiHumanReadableName()
      }),

      [resourceDeploymentName]: apiGatewayDeployment({
        restApiName: resourceApiName,
        stageName: STAGE,
        dependencies: [
          resourceName
        ]
      }),

      [resourceCollectionPathName]: apiGatewayResource({
        pathPart: restApiCollectionPathPart(resource),
        restApiName: resourceApiName,
        parentName: getParentResourceName(through)
      }),

      [resourceMemberPathName]: apiGatewayResource({
        pathPart: restApiMemberPathPart(resource, key),
        restApiName: resourceApiName,
        parentName: resourceCollectionPathName
      }),

      [resourceName]: apiGatewayMethod({
        httpMethod: method,
        restApiName: resourceApiName,
        resourceName: (member) ? resourceMemberPathName : resourceCollectionPathName,
        lambdaFunctionName: resourceHandlerName
      }),

      [resourcePermissionName]: lambdaPermission({
        restApiName: resourceApiName,
        httpMethod: method,
        pathMatcher: (member) ? restApiMemberPathMatcher(resource, getRoutePrefix(through)) : restApiCollectionPathMatcher(resource, getRoutePrefix(through)),
        functionName: resourceHandlerName
      })
    };

    const resources = (member) ? allResources : omit(allResources, resourceMemberPathName);

    const outputs = {
      [resourceApiUrlName]: {
        Value: {
          'Fn::Sub': `https://\${${resourceApiName}}.execute-api.\${AWS::Region}.amazonaws.com/${STAGE}`
        }
      }
    };

    const templateDef = cloudFormationTemplate({
      resources,
      outputs
    });

    this.mergeCloudFormationTemplate(templateDef);
  }
};
