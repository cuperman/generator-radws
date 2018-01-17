const { upperCase } = require('lodash');

const API_GATEWAY_METHOD = 'AWS::ApiGateway::Method';

module.exports = function(properties = {}) {
  const AuthorizationType = 'NONE';

  const HttpMethod = upperCase(properties.httpMethod);

  const RestApiId = {
    Ref: properties.restApiName
  };

  const ResourceId = {
    Ref: properties.resourceName
  };

  const Integration = {
    Type: 'AWS_PROXY',
    IntegrationHttpMethod: 'POST',
    Uri: {
      'Fn::Sub': `arn:aws:apigateway:\${AWS::Region}:lambda:path/2015-03-31/functions/\${${properties.lambdaFunctionName}.Arn}/invocations`
    }
  };

  return {
    Type: API_GATEWAY_METHOD,
    Properties: {
      AuthorizationType,
      HttpMethod,
      RestApiId,
      ResourceId,
      Integration
    }
  };
};
