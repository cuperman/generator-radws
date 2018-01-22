'use strict';

const Generator = require('yeoman-generator');
const cloudFormationTemplate = require('../../lib/cloudformation_template');
const { withCloudFormationTemplates } = require('../../lib/cloudformation_template/yeoman');
const { omit } = require('lodash');

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
      type: Boolean,
      default: false
    });
  }

  updateCloudFormationTemplate() {
    const { resource, method, handler, member } = this.options;
    const type = member ? 'member' : 'collection';
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
        restApiName: resourceApiName
      }),

      [resourceMemberPathName]: apiGatewayResource({
        pathPart: restApiMemberPathPart(resource),
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
        pathMatcher: (member) ? restApiMemberPathMatcher(resource) : restApiCollectionPathMatcher(resource),
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
