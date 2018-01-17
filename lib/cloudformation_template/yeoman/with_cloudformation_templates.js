const path = require('path');
const { merge } = require('lodash');
const cloudFormationTemplate = require('../index');

module.exports = function(classToExtend) {
  return class extends classToExtend {
    mergeCloudFormationTemplate(templateDef) {
      const templateFilename = path.resolve(process.cwd(), 'template.json');
      const templateJson = this.fs.readJSON(templateFilename, cloudFormationTemplate());
      this.fs.writeJSON(templateFilename, merge({}, templateJson, templateDef));
    }
  };
};
