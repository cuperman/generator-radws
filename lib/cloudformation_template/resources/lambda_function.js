'use strict';

const LAMBDA_FUNCTION = 'AWS::Lambda::Function';

const DEFAULT_RUNTIME = 'nodejs6.10';

module.exports = function(properties = {}) {
  const Role = {
    'Fn::GetAtt': [ properties.roleName, 'Arn' ]
  };

  const Environment = {
    Variables: properties.environment || {}
  };

  const Code = properties.codeUri;
  const Handler = properties.handler;
  const Runtime = properties.runtime || DEFAULT_RUNTIME;

  return {
    Type: LAMBDA_FUNCTION,
    Properties: {
      Code,
      Environment,
      Handler,
      Role,
      Runtime
    }
  };
};
