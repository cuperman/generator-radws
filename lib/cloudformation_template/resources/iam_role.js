'use strict';

const { map, concat } = require('lodash');

const IAM_ROLE = 'AWS::IAM::Role';

const AWSLambdaBasicExecutionRole = 'arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole';

module.exports = function(properties = {}) {
  const AssumeRolePolicyDocument = {
    Version: '2012-10-17',
    Statement: [{
      Effect: 'Allow',
      Principal: {
        Service: [ 'lambda.amazonaws.com' ]
      },
      Action: [ 'sts:AssumeRole' ]
    }]
  };

  const defaultPolicyArns = [
    AWSLambdaBasicExecutionRole
  ];

  const additionalPolicyArns = map(properties.policies || [], policy => {
    return `arn:aws:iam::aws:policy/${policy}`;
  });

  const ManagedPolicyArns = concat(defaultPolicyArns, additionalPolicyArns);

  return {
    Type: IAM_ROLE,
    Properties: {
      AssumeRolePolicyDocument,
      ManagedPolicyArns
    }
  };
};
