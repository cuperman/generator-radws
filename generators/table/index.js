'use strict';

const Generator = require('yeoman-generator');
const path = require('path');
const cloudFormationTemplate = require('../../lib/cloudformation_template');
const { withCloudFormationTemplates } = require('../../lib/cloudformation_template/yeoman');

const { dynamoDbTable } = require('../../lib/cloudformation_template/resources');

const {
  tableFilePath,
  tableFileBaseName,
  tableFileExtension,
  tableClassName,
  tableResourceName
} = require('../../conventions');

const TABLE_TEMPLATE = 'table.js';
const DEFAULT_HASH_KEY_NAME = 'ID';
const DEFAULT_HASH_KEY_TYPE = 'S'; // String

module.exports = class extends withCloudFormationTemplates(Generator) {
  constructor(args, opts) {
    super(args, opts);
    this.argument('resource', { type: String, required: true });
  }

  writing() {
    const { resource } = this.options;
    const tableFilename = [tableFileBaseName(resource), tableFileExtension()].join('.');
    const destinationPath = path.resolve(tableFilePath(), tableFilename);

    this.fs.copyTpl(
      this.templatePath(TABLE_TEMPLATE),
      this.destinationPath(destinationPath),
      {
        tableClassName: tableClassName(resource)
      }
    );
  }

  updateCloudFormationTemplate() {
    const { resource } = this.options;
    const resourceName = tableResourceName(resource);

    const templateDef = cloudFormationTemplate({
      resources: {
        [resourceName]: dynamoDbTable({
          hashKeyName: DEFAULT_HASH_KEY_NAME,
          hashKeyType: DEFAULT_HASH_KEY_TYPE
        })
      },
      outputs: {
        [resourceName]: {
          Value: {
            Ref: resourceName
          }
        }
      }
    });

    this.mergeCloudFormationTemplate(templateDef);
  }
};
