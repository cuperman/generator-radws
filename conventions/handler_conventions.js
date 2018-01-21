'use strict';

const { snakeCase, camelCaps } = require('../lib/casing');

module.exports = {
  handlerFilePath: (resource) => `app/${snakeCase(resource)}/handlers`,
  handlerFileBaseName: (resource, handler) => [snakeCase(resource), snakeCase(handler)].join('_'),
  handlerFileExtension: () => 'js',
  handlerFunctionName: () => 'handler',
  handlerResourceName: (resource, handler) => `${camelCaps(resource)}${camelCaps(handler)}Handler`,
  handlerRoleResourceName: (resource, handler) => `${camelCaps(resource)}${camelCaps(handler)}HandlerRole`
};
