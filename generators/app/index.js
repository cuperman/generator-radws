'use strict';

const Generator = require('yeoman-generator');
const chalk = require('chalk');
const yosay = require('yosay');

module.exports = class extends Generator {
  prompting() {

    // Have Yeoman greet the user.
    this.log(yosay(
      'Welcome to the geometric ' + chalk.red('jeffws') + ' generator!'
    ));

    const prompts = [{
      type: 'confirm',
      name: 'someAnswer',
      message: 'Would you like to enable this option?',
      default: true
    }];

    return this.prompt(prompts).then(props => {
      // To access props later use this.props.someAnswer;
      this.props = props;
    });
  }

  writing() {
    this.fs.copy(
      this.templatePath('.eslintignore'),
      this.destinationPath('.eslintignore')
    );

    this.fs.copy(
      this.templatePath('.eslintrc.js'),
      this.destinationPath('.eslintrc.js')
    );

    this.fs.copy(
      this.templatePath('.gitignore'),
      this.destinationPath('.gitignore')
    );

    this.fs.copy(
      this.templatePath('README.md'),
      this.destinationPath('README.md')
    );

    this.fs.copy(
      this.templatePath('template.yml'),
      this.destinationPath('template.yml')
    );
  }

  installingAwsSdk() {
    this.npmInstall(['aws-sdk'], { save: true });
  }

  installingJeffwsService() {
    this.npmInstall(['jeffws-service@next'], { save: true });
  }

  installingMochaChai() {
    this.npmInstall(['mocha', 'chai'], { 'save-dev': true });
  }

  installingEslint() {
    this.npmInstall(['eslint'], { 'save-dev': true });
  }

  install() {
    this.installDependencies();
  }
};
