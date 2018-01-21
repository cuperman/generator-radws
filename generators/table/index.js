'use strict';

const Generator = require('yeoman-generator');
const path = require('path');
const { pickBy } = require('lodash');
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

module.exports = class extends withCloudFormationTemplates(Generator) {
  constructor(args, opts) {
    super(args, opts);

    this.argument('resource', { type: String, required: true });

    this.option('hash', {
      desc: 'Hash key descriptor (format: name:type)',
      type: String,
      default: 'Id:String'
    });

    this.option('range', {
      desc: 'Range key descriptor (format: name:type)',
      type: String
    });

    this.option('range');
  }

  writing() {
    const { resource } = this.options;
    const tableFilename = [tableFileBaseName(resource), tableFileExtension()].join('.');
    const destinationPath = path.resolve(tableFilePath(resource), tableFilename);

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
    const hashKeyDescriptor = this.options.hash;
    const rangeKeyDescriptor = this.options.range || '';

    const [hashKeyName, hashKeyType] = hashKeyDescriptor.split(':');
    const [rangeKeyName, rangeKeyType] = rangeKeyDescriptor.split(':');

    const templateDef = cloudFormationTemplate({
      resources: {
        [resourceName]: dynamoDbTable(pickBy({
          hashKeyName: hashKeyName,
          hashKeyType: hashKeyType,
          rangeKeyName: rangeKeyName,
          rangeKeyType: rangeKeyType
        }, element => element))
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
