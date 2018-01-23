const { execute, itExpects } = require('../../lib/test/helpers');

const subject = require('../route_conventions');

describe('route conventions:', () => {
  // package-specific
  itExpects(execute(subject.restApiName)).toEqual('GeneratorJeffwsRestApi');
  itExpects(execute(subject.restApiDeploymentName)).toEqual('GeneratorJeffwsRestApiDeployment');
  itExpects(execute(subject.restApiHumanReadableName)).toEqual('Generator jeffws api');
  itExpects(execute(subject.restApiUrlName, 'prod')).toEqual('GeneratorJeffwsRestApiUrlProd');

  // resource-specific
  itExpects(execute(subject.restApiCollectionPathName, 'list item')).toEqual('ListItemRestApiCollection');
  itExpects(execute(subject.restApiMemberPathName, 'list item')).toEqual('ListItemRestApiMember');
  itExpects(execute(subject.restApiMethodName, 'list item', 'get')).toEqual('ListItemRestApiMethodCollectionGet');
  itExpects(execute(subject.restApiMethodName, 'list item', 'get', 'member')).toEqual('ListItemRestApiMethodMemberGet');
  itExpects(execute(subject.restApiLambdaPermissionName, 'list item', 'get')).toEqual('ListItemRestApiPermitMethodCollectionGet');
  itExpects(execute(subject.restApiLambdaPermissionName, 'list item', 'get', 'member')).toEqual('ListItemRestApiPermitMethodMemberGet');
  itExpects(execute(subject.restApiCollectionPathPart, 'list item')).toEqual('list_item');
  itExpects(execute(subject.restApiCollectionPathMatcher, 'list item')).toEqual('list_item');
  itExpects(execute(subject.restApiMemberPathPart, 'list item')).toEqual('{listItemKey}');
  itExpects(execute(subject.restApiMemberPathPart, 'list item', 'name')).toEqual('{listItemName}');
  itExpects(execute(subject.restApiMemberPathMatcher, 'list item')).toEqual('list_item/*');
});
