'use strict';

const Generator = require('yeoman-generator');
const path = require('path');
const cloudFormationTemplate = require('../../lib/cloudformation_template');
const { withCloudFormationTemplates } = require('../../lib/cloudformation_template/yeoman');
const { iamRole, lambdaFunction } = require('../../lib/cloudformation_template/resources');

const {
  handlerFilePath,
  handlerFileBaseName,
  handlerFileExtension,
  handlerFunctionName,
  handlerResourceName,
  handlerRoleResourceName,
  appBundleFilePath,
  appBundleFileBaseName,
  appBundleFileExtension,
  tableResourceName,
  tableEnvVarName
} = require('../../conventions');

const HANDLER_TEMPLATE = 'handler.js.ejs';
const HANDLER_RUNTIME = 'nodejs6.10';

module.exports = class extends withCloudFormationTemplates(Generator) {
  constructor(args, opts) {
    super(args, opts);

    this.argument('resource', {
      type: String,
      required: true
    });

    this.argument('handler', {
      type: String,
      required: true
    });

    this.option('table-access', {
      type: Boolean,
      default: false
    });
  }

  writing() {
    const { resource, handler, tableAccess } = this.options;
    const handlerFilename = [handlerFileBaseName(resource, handler), handlerFileExtension()].join('.');
    const destinationPath = path.resolve(handlerFilePath(resource), handlerFilename);

    this.fs.copyTpl(
      this.templatePath(HANDLER_TEMPLATE),
      this.destinationPath(destinationPath),
      {
        tableAccess
      }
    );
  }

  updateCloudFormationTemplate() {
    const { resource, handler, tableAccess } = this.options;
    const resourceName = handlerResourceName(resource, handler);
    const resourceTableName = tableResourceName(resource);
    const resourceTableEnvVarName = tableEnvVarName(resource);
    const roleResourceName = handlerRoleResourceName(resource, handler);

    const tablePolicies = [
      'AmazonDynamoDBFullAccess'
    ];

    const tableEnvVars = {
      REGION: {
        Ref: 'AWS::Region'
      },
      [resourceTableEnvVarName]: {
        Ref: resourceTableName
      }
    };

    const codeUri = ['.', appBundleFilePath(), [appBundleFileBaseName(), appBundleFileExtension()].join('.')].join('/');
    const handlerFunctionPath = [handlerFilePath(resource), [handlerFileBaseName(resource, handler), handlerFunctionName()].join('.')].join('/');
    const policies = tableAccess ? tablePolicies : [];
    const environment = tableAccess ? tableEnvVars : {};

    const templateDef = cloudFormationTemplate({
      resources: {
        [roleResourceName]: iamRole({
          policies
        }),

        [resourceName]: lambdaFunction({
          codeUri,
          handler: handlerFunctionPath,
          roleName: roleResourceName,
          runtime: HANDLER_RUNTIME,
          environment
        })
      }
    });

    this.mergeCloudFormationTemplate(templateDef);
  }
};
