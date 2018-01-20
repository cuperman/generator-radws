const { execute, itExpects } = require('../../lib/test/helpers');

const subject = require('../app_conventions');

describe('app conventions:', () => {
  itExpects(execute(subject.appCodePath)).toEqual('app');
  itExpects(execute(subject.appTestPath)).toEqual('test');
  itExpects(execute(subject.appBundleFilePath)).toEqual('package');
  itExpects(execute(subject.appBundleFileBaseName)).toEqual('generator-jeffws');
  itExpects(execute(subject.appBundleFileExtension)).toEqual('zip');
});
