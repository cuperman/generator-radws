'use strict';

const { packageName } = require('../lib/packageJson');

module.exports = {
  appCodePath: () => 'app',
  appTestPath: () => 'test',
  appBundleFilePath: () => 'package',
  appBundleFileBaseName: () => packageName,
  appBundleFileExtension: () => 'zip'
};
