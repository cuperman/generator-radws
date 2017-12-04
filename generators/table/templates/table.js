const Document = require('jeffws-service/document');
const uuid = require('uuid/v4');

const REGION = process.env.REGION;
const TABLE_NAME = process.env.TABLE_NAME;

const <%= tableClassName %> = Document({
  region: REGION,
  tableName: TABLE_NAME,
  partitionKey: 'ID',
  partitionKeyGenerator: uuid,
  timestamps: true
});

module.exports = <%= tableClassName %>;
