const dynamoDBTable = require('../dynamodb_table');

describe('cloudFormationTemplate', () => {
  describe('dynamoDBTable', () => {
    it('requires hashKeyName');
    it('requires hashKeyType');

    it('supports hashKeyName & hashKeyType', () => {
      expect(dynamoDBTable({
        hashKeyName: 'Id',
        hashKeyType: 'S'
      })).toEqual({
        Type: 'AWS::DynamoDB::Table',
        Properties: {
          AttributeDefinitions: [{
            AttributeName: 'Id',
            AttributeType: 'S'
          }],
          KeySchema: [{
            AttributeName: 'Id',
            KeyType: 'HASH'
          }],
          ProvisionedThroughput: {
            ReadCapacityUnits: 5,
            WriteCapacityUnits: 5
          }
        }
      });
    });

    it('supports rangeKeyName & rangeKeyType', () => {
      expect(dynamoDBTable({
        hashKeyName: 'Id',
        hashKeyType: 'S',
        rangeKeyName: 'Order',
        rangeKeyType: 'N'
      })).toEqual({
        Type: 'AWS::DynamoDB::Table',
        Properties: {
          AttributeDefinitions: [{
            AttributeName: 'Id',
            AttributeType: 'S'
          }, {
            AttributeName: 'Order',
            AttributeType: 'N'
          }],
          KeySchema: [{
            AttributeName: 'Id',
            KeyType: 'HASH'
          }, {
            AttributeName: 'Order',
            KeyType: 'RANGE'
          }],
          ProvisionedThroughput: {
            ReadCapacityUnits: 5,
            WriteCapacityUnits: 5
          }
        }
      });
    });
  });
});
