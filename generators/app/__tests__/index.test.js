'use strict';

// const path = require('path');
const assert = require('yeoman-assert');
// const helpers = require('yeoman-test');

describe('generator-jeffws:app', () => {
  beforeAll(() => {
    // return helpers.run(path.join(__dirname, '../generators/app'))
    //   .withPrompts({someAnswer: true});
  });

  xit('creates files', () => {
    assert.file([
      'dummyfile.txt'
    ]);
  });
});
