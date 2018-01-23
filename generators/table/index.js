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
  tableResourceName,
  tableEnvVarName,
  tableTitle
} = require('../../conventions');

const TABLE_TEMPLATE = 'table.js.ejs';

module.exports = class extends withCloudFormationTemplates(Generator) {
  constructor(args, opts) {
    super(args, opts);

    this.argument('resource', {
      type: String,
      required: true
    });

    this.option('hash', {
      desc: 'Hash key descriptor (format: name:type)',
      type: String,
      default: 'Id:String'
    });

    this.option('range', {
      desc: 'Range key descriptor (format: name:type)',
      type: String
    });
  }

  writing() {
    const { resource, hash, range } = this.options;
    const tableFilename = [tableFileBaseName(resource), tableFileExtension()].join('.');
    const destinationPath = path.resolve(tableFilePath(resource), tableFilename);

    const [hashKeyName, hashKeyType] = hash.split(':');
    const [rangeKeyName, rangeKeyType] = (range || '').split(':');

    this.fs.copyTpl(
      this.templatePath(TABLE_TEMPLATE),
      this.destinationPath(destinationPath),
      {
        tableEnvVarName: tableEnvVarName(resource),
        tableTitle: tableTitle(resource),
        hashKeyName,
        hashKeyType,
        rangeKeyName,
        rangeKeyType
      }
    );
  }

  updateCloudFormationTemplate() {
    const { resource, hash, range } = this.options;
    const resourceName = tableResourceName(resource);

    const [hashKeyName, hashKeyType] = hash.split(':');
    const [rangeKeyName, rangeKeyType] = (range || '').split(':');

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
