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
      'Welcome to the ' + chalk.green('Radws') + ' generator!'
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
      this.templatePath('eslintignore.ejs'),
      this.destinationPath('.eslintignore'),
      {
        packageDir
      }
    );

    this.fs.copy(
      this.templatePath('eslintrc.js'),
      this.destinationPath('.eslintrc.js')
    );

    this.fs.copyTpl(
      this.templatePath('gitignore.ejs'),
      this.destinationPath('.gitignore'),
      {
        packageDir
      }
    );

    this.fs.copyTpl(
      this.templatePath('aws.json.ejs'),
      this.destinationPath('aws.json'),
      {
        awsProfile,
        awsCodeBucket
      }
    );

    this.fs.copyTpl(
      this.templatePath('Jakefile.ejs'),
      this.destinationPath('Jakefile'),
      {
        packageDir,
        packageName,
        codeDir
      }
    );

    this.fs.copyTpl(
      this.templatePath('README.md.ejs'),
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
      cloudFormationTemplate({
        outputs: {
          AwsPartition: { Value: { Ref: 'AWS::Partition' } },
          AwsRegion: { Value: { Ref: 'AWS::Region' } },
          AwsStackId: { Value: { Ref: 'AWS::StackId' } },
          AwsStackName: { Value: { Ref: 'AWS::StackName' } },
          AwsUrlSuffix: { Value: { Ref: 'AWS::URLSuffix' } }
        }
      })
    );
  }

  installingAppDependencies() {
    this.npmInstall([
      'aws-sdk',
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
