'use strict';

const { packageName } = require('../lib/packageJson');

module.exports = {
  appBundleFilePath: () => 'package',
  appBundleFileBaseName: () => packageName,
  appBundleFileExtension: () => 'zip'
};
