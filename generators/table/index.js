'use strict';

const Generator = require('yeoman-generator');
const { camelCase, snakeCase, capitalize, toLower } = require('lodash');

module.exports = class extends Generator {
  constructor(args, opts) {
    super(args, opts);

    this.argument('tableName', { type: String, required: true });
  }

  writing() {
    const tableFileName = toLower(snakeCase(this.options.tableName));
    const tableClassName = capitalize(camelCase(this.options.tableName));

    this.fs.copyTpl(
      this.templatePath('table.js'),
      this.destinationPath(`tables/${tableFileName}.js`),
      { tableClassName }
    );
  }
};
