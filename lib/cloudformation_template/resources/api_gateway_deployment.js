const API_GATEWAY_DEPLOYMENT = 'AWS::ApiGateway::Deployment';

module.exports = function(properties = {}) {
  const RestApiId = {
    Ref: properties.restApiName
  };
  const StageName = properties.stageName;

  return {
    Type: API_GATEWAY_DEPLOYMENT,
    Properties: {
      RestApiId,
      StageName
    },
    DependsOn: properties.dependencies
  };
};
