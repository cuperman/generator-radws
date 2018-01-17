const API_GATEWAY_REST_API = 'AWS::ApiGateway::RestApi';

module.exports = function(properties = {}) {
  const Name = properties.name;

  return {
    Type: API_GATEWAY_REST_API,
    Properties: {
      Name
    }
  };
};
