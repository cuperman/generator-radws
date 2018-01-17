'use strict';

const { snakeCase, camelCase, camelCaps } = require('../lib/casing');

module.exports = {
  handlerFilePath: () => 'app/handlers',
  handlerFileBaseName: (resource) => `${snakeCase(resource)}_handlers`,
  handlerFileExtension: () => 'js',
  handlerFunctionName: (handler) => `${camelCase(handler)}`,
  handlerResourceName: (resource, handler) => `${camelCaps(resource)}${camelCaps(handler)}Handler`,
  handlerRoleResourceName: (resource, handler) => `${camelCaps(resource)}${camelCaps(handler)}HandlerRole`
};
