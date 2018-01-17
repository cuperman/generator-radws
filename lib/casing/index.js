'use strict';

const { upperFirst, toUpper, camelCase, snakeCase } = require('lodash');

function camelCaps(string) {
  return upperFirst(camelCase(string));
}

function screamingSnakeCase(string) {
  return toUpper(snakeCase(string));
}

module.exports = {
  camelCase,
  snakeCase,
  camelCaps,
  screamingSnakeCase
};
