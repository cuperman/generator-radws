'use strict';

const Generator = require('yeoman-generator');
const chalk = require('chalk');
const yosay = require('yosay');
const path = require('path');
const { merge } = require('lodash');

const { appCodePath, appTestPath, appBundleFilePath } = require('../../conventions');
const { packageName, packageDescription } = require('../../lib/packageJson');
const cloudFormationTemplate = require('../../lib/cloudformation_template');

module.exports = class extends Generator {
  prompting() {
    this.log(yosay(
      'Welcome to the ' + chalk.green('Jeffws') + ' generator!'
    ));

    return this.prompt([{
      type: 'input',
      name: 'awsProfile',
      message: 'Enter AWS profile to use for authentication:',
      default: 'default'
    }, {
      type: 'input',
      name: 'awsCodeBucket',
      message: 'Enter S3 bucket to upload application code:'
    }]).then(props => {
      this.props = props;
    });
  }

  writing() {
    const { awsProfile, awsCodeBucket } = this.props;
    const codeDir = appCodePath();
    const testDir = appTestPath();
    const packageDir = appBundleFilePath();

    this.fs.copyTpl(
      this.templatePath('.eslintignore'),
      this.destinationPath('.eslintignore'),
      {
        packageDir
      }
    );

    this.fs.copy(
      this.templatePath('.eslintrc.js'),
      this.destinationPath('.eslintrc.js')
    );

    this.fs.copyTpl(
      this.templatePath('.gitignore'),
      this.destinationPath('.gitignore'),
      {
        packageDir
      }
    );

    this.fs.copyTpl(
      this.templatePath('aws.json'),
      this.destinationPath('aws.json'),
      {
        awsProfile,
        awsCodeBucket
      }
    );

    this.fs.copyTpl(
      this.templatePath('Jakefile'),
      this.destinationPath('Jakefile'),
      {
        packageDir,
        packageName,
        codeDir
      }
    );

    this.fs.copyTpl(
      this.templatePath('README.md'),
      this.destinationPath('README.md'),
      {
        packageName,
        packageDescription
      }
    );

    this.fs.write(
      path.resolve(codeDir, '.keep'),
      ''
    );

    this.fs.write(
      path.resolve(testDir, '.keep'),
      ''
    );

    this.fs.writeJSON(
      'template.json',
      cloudFormationTemplate()
    );
  }

  installingAppDependencies() {
    this.npmInstall([
      'jeffws-service@next',
      'aws-sdk',
      'uuid'
    ], {
      save: true
    });
  }

  installingDevDependencies() {
    this.npmInstall([
      'eslint',
      'mocha',
      'chai',
      'jake'
    ], {
      'save-dev': true
    });
  }

  install() {
    this.installDependencies({
      npm: true,
      bower: false,
      yarn: false
    });
  }

  addPackageScripts() {
    const packageFile = path.resolve(process.cwd(), 'package.json');
    const packageJson = this.fs.readJSON(packageFile);

    const packageScripts = {
      build: 'jake build',
      clean: 'jake clean',
      deploy: 'jake deploy',
      destroy: 'jake destroy',
      test: 'npm run test:lint && npm run test:unit',
      'test:lint': 'eslint .',
      'test:unit': 'mocha'
    };

    this.fs.writeJSON(packageFile, merge({}, packageJson, { scripts: packageScripts }));
  }
};
