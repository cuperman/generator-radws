'use strict';

const { packageName } = require('../lib/packageJson');
const { camelCaps, camelCase, snakeCase } = require('../lib/casing');
const { capitalize, join, words } = require('lodash');

module.exports = {
  // package-specific
  restApiName: () => `${camelCaps(packageName)}RestApi`,
  restApiDeploymentName: () => `${camelCaps(packageName)}RestApiDeployment`,
  restApiHumanReadableName: () => capitalize(join(words([packageName, 'API']), ' ')),
  restApiUrlName: (stage) => `${camelCaps(packageName)}RestApiUrl${camelCaps(stage)}`,

  // resource-specific
  restApiCollectionPathName: (resource) => `${camelCaps(resource)}RestApiCollection`,
  restApiMemberPathName: (resource) => `${camelCaps(resource)}RestApiMember`,
  restApiMethodName: (resource, method) => `${camelCaps(resource)}RestApiMethod${camelCaps(method)}`,
  restApiLambdaPermissionName: (resource, method) => `${camelCaps(resource)}RestApiPermitMethod${camelCaps(method)}`,
  restApiCollectionPathPart: (resource) => snakeCase(resource),
  restApiMemberPathPart: (resource) => `{${camelCase(resource)}Id}`,
  restApiCollectionPathMatcher: (resource) => snakeCase(resource),
  restApiMemberPathMatcher: (resource) => `${snakeCase(resource)}/*`
};
