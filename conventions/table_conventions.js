'use strict';

const { snakeCase, screamingSnakeCase, camelCaps } = require('../lib/casing');

module.exports = {
  tableFilePath: () => 'app/tables',
  tableFileBaseName: (resource) =>`${snakeCase(resource)}` ,
  tableFileExtension: () => 'js',
  tableResourceName: (resource) => `${camelCaps(resource)}Table`,
  tableClassName: (resource) => camelCaps(resource),
  tableEnvVarName: (resource) => `${screamingSnakeCase(resource)}_TABLE`
};
