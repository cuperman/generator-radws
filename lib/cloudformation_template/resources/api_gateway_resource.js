const API_GATEWAY_RESOURCE = 'AWS::ApiGateway::Resource';

module.exports = function(properties = {}) {
  const PathPart = properties.pathPart;
  const RestApiId = {
    Ref: properties.restApiName
  };
  const ParentId = properties.parentName ? { Ref: properties.parentName } : { 'Fn::GetAtt': [ properties.restApiName, 'RootResourceId' ] };

  return {
    Type: API_GATEWAY_RESOURCE,
    Properties: {
      PathPart,
      RestApiId,
      ParentId
    }
  };
};
