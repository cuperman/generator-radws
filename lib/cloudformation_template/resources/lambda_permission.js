'use strict';

const LAMBDA_PERMISSION = 'AWS::Lambda::Permission';

module.exports = function(properties = {}) {
  const restApiName = properties.restApiName;
  const httpMethod = properties.httpMethod.toUpperCase();
  const pathMatcher = properties.pathMatcher;
  const functionName = properties.functionName;

  const Principal = 'apigateway.amazonaws.com';
  const SourceArn = {
    'Fn::Sub': `arn:aws:execute-api:\${AWS::Region}:\${AWS::AccountId}:\${${restApiName}}/*/${httpMethod}/${pathMatcher}`
  };
  const Action = 'lambda:InvokeFunction';
  const FunctionName = {
    'Fn::GetAtt': [ functionName, 'Arn' ]
  };

  return {
    Type: LAMBDA_PERMISSION,
    Properties: {
      Principal,
      SourceArn,
      Action,
      FunctionName
    }
  };
};
