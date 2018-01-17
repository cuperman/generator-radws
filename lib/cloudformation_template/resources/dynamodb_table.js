'use strict';

const DYNAMODB_TABLE = 'AWS::DynamoDB::Table';

const HASH_KEY = 'HASH';
const RANGE_KEY = 'RANGE';

const DEFAULT_READ_CAPACITY_UNITS = 5;
const DEFAULT_WRITE_CAPACITY_UNITS = 5;

function attributeDefinition(AttributeName, AttributeType) {
  return {
    AttributeName,
    AttributeType
  };
}

function keySchema(AttributeName, KeyType) {
  return {
    AttributeName,
    KeyType
  };
}

module.exports = function(properties = {}) {
  if (!properties.hashKeyName) {
    throw new Error('table property: hashKeyName required');
  }

  if (!properties.hashKeyType) {
    throw new Error('table property: hashKeyType required');
  }

  const hashKeyName = properties.hashKeyName;
  const hashKeyType = properties.hashKeyType;
  const rangeKey = properties.rangeKey || undefined;
  const rangeKeyType = properties.rangeKeyType || undefined;

  const ReadCapacityUnits = properties.readCapacityUnits || DEFAULT_READ_CAPACITY_UNITS;
  const WriteCapacityUnits = properties.writeCapacityUnits || DEFAULT_WRITE_CAPACITY_UNITS;

  const AttributeDefinitions = [
    attributeDefinition(hashKeyName, hashKeyType),
    (rangeKey ? attributeDefinition(rangeKey, rangeKeyType) : undefined)
  ].filter(element => element);

  const KeySchema = [
    keySchema(hashKeyName, HASH_KEY),
    (rangeKey ? keySchema(rangeKey, RANGE_KEY) : undefined)
  ].filter(element => element);

  return {
    Type: DYNAMODB_TABLE,
    Properties: {
      AttributeDefinitions,
      KeySchema,
      ProvisionedThroughput: {
        ReadCapacityUnits,
        WriteCapacityUnits
      }
    }
  };
};
