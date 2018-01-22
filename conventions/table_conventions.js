'use strict';

const path = require('path');
const { snakeCase, screamingSnakeCase, camelCaps } = require('../lib/casing');
const { capitalize } = require('lodash');

module.exports = {
  tableFilePath: (resource) => path.join('app', snakeCase(resource)),
  tableFileBaseName: (resource) =>`${snakeCase(resource)}_table` ,
  tableFileExtension: () => 'js',
  tableResourceName: (resource) => `${camelCaps(resource)}Table`,
  tableClassName: (resource) => `${camelCaps(resource)}Table`,
  tableEnvVarName: (resource) => `${screamingSnakeCase(resource)}_TABLE`,
  tableTitle: (resource) => `${capitalize(resource)} table`
};
