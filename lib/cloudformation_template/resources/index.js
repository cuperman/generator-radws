module.exports = {
  apiGatewayDeployment: require('./api_gateway_deployment'),
  apiGatewayMethod: require('./api_gateway_method'),
  apiGatewayResource: require('./api_gateway_resource'),
  apiGatewayRestApi: require('./api_gateway_rest_api'),
  dynamoDbTable: require('./dynamodb_table'),
  iamRole: require('./iam_role'),
  lambdaFunction: require('./lambda_function'),
  lambdaPermission: require('./lambda_permission')
};
