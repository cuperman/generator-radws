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
  handlerResourceName,
  handlerRoleResourceName,
  handlerFunctionName,
  appBundleFilePath,
  appBundleFileBaseName,
  appBundleFileExtension
} = require('../../conventions');

const HANDLER_TEMPLATE = 'handler_simple.js';
const HANDLER_RUNTIME = 'nodejs6.10';

module.exports = class extends withCloudFormationTemplates(Generator) {
  constructor(args, opts) {
    super(args, opts);
    this.argument('resource', { type: String, required: true });
    this.argument('handler', { type: String, required: true });
  }

  writing() {
    const { resource, handler } = this.options;
    const handlerFilename = [handlerFileBaseName(resource), handlerFileExtension()].join('.');
    const destinationPath = path.resolve(handlerFilePath(), handlerFilename);
    const functionName = handlerFunctionName(handler);

    this.fs.copyTpl(
      this.templatePath(HANDLER_TEMPLATE),
      this.destinationPath(destinationPath),
      {
        handlerFunctionName: functionName
      }
    );
  }

  updateCloudFormationTemplate() {
    const { resource, handler } = this.options;
    const resourceName = handlerResourceName(resource, handler);
    const roleResourceName = handlerRoleResourceName(resource);

    const policies = [];
    const environment = {};

    // if data accessor, add these:
    // policies: [
    //   POLICY_AMAZON_DYNAMODB_FULL_ACCESS
    // ],
    // environment: {
    //   [TableEnvVarName]: {
    //     Ref: TableName
    //   }
    // }

    const codeUri = ['.', appBundleFilePath(), [appBundleFileBaseName(), appBundleFileExtension()].join('.')].join('/');
    const handlerFunctionPath = [handlerFilePath(), [handlerFileBaseName(resource), handlerFunctionName(handler)].join('.')].join('/');

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
