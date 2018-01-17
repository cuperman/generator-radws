'use strict';

const path = require('path');
const fs = require('fs');

const packageJsonFilename = path.resolve(process.cwd(), 'package.json');
const packageJson = JSON.parse(fs.readFileSync(packageJsonFilename));

module.exports = {
  packageName: packageJson.name,
  packageDescription: packageJson.description
};
