'use strict';

const Generator = require('yeoman-generator');
const { camelCase, snakeCase, capitalize, toLower } = require('lodash');

module.exports = class extends Generator {
  constructor(args, opts) {
    super(args, opts);

    this.argument('resourceName', { type: String, required: true });
  }

  writing() {
    const handlerFileName = toLower(snakeCase(this.options.resourceName)) + '_handler';
    const tableFileName = capitalize(camelCase(this.options.resourceName));
    const tableClassName = capitalize(camelCase(this.options.resourceName));

    const resourceVar = camelCase(this.options.resourceName);
    const resourceVarPlural = camelCase(this.options.resourceName) + 's'; // poor man's pluralize
    const resourceIdVar = camelCase(this.options.resourceName) + 'Id';
    const resourcePathPlural = toLower(snakeCase(this.options.resourceName)) + 's'; // poor man's pluralize

    this.fs.copyTpl(
      this.templatePath('handler.js'),
      this.destinationPath(`handlers/${handlerFileName}.js`),
      { tableClassName, tableFileName,
        resourceVar, resourceVarPlural,
        resourceIdVar, resourceVarPlural,
        resourcePathPlural }
    );
  }
};
