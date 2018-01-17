const path = require('path');
const { isArray, isString, mergeWith, map, union } = require('lodash');
const cloudFormationTemplate = require('../index');

function isArrayOfStrings(obj) {
  return isArray(obj) && !map(obj, item => isString(item)).includes(false);
}

function combineArraysOfStrings(objValue, srcValue) {
  if (isArrayOfStrings(objValue)) {
    return union(objValue, srcValue);
  }
}

module.exports = function(classToExtend) {
  return class extends classToExtend {
    mergeCloudFormationTemplate(templateDef) {
      const templateFilename = path.resolve(process.cwd(), 'template.json');
      const templateJson = this.fs.readJSON(templateFilename, cloudFormationTemplate());
      this.fs.writeJSON(templateFilename, mergeWith({}, templateJson, templateDef, combineArraysOfStrings));
    }
  };
};
