'use strict';

const AWS = require('aws-sdk');

const REGION = process.env.REGION;
const TABLE_NAME = process.env.TABLE_NAME;

AWS.config.update({
  region: REGION
});

const defaultParams = {
  TableName: TABLE_NAME
};

const docClient = new AWS.DynamoDB.DocumentClient({
  apiVersion: '2012-08-10'
});

module.exports = {
  delete: (params, callback) => docClient.delete(Object.assign({}, defaultParams, params), callback),
  get: (params, callback) => docClient.get(Object.assign({}, defaultParams, params), callback),
  put: (params, callback) => docClient.get(Object.assign({}, defaultParams, params), callback),
  query: (params, callback) => docClient.get(Object.assign({}, defaultParams, params), callback),
  scan: (params, callback) => docClient.get(Object.assign({}, defaultParams, params), callback),
  update: (params, callback) => docClient.get(Object.assign({}, defaultParams, params), callback)
};
