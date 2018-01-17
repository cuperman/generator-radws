const { execute, itExpects } = require('../../test/helpers');

const subject = require('../index');

describe('casing:', () => {
  itExpects(execute(subject.camelCaps, 'foo bar')).toEqual('FooBar');
  itExpects(execute(subject.screamingSnakeCase, 'foo bar')).toEqual('FOO_BAR');
});
