const { assign, isEmpty, reduce } = require('lodash');

const AWS_TEMPLATE_FORMAT_VERSION = '2010-09-09';

function CloudFormationTemplate(options = {}) {
  const { resources, outputs, description } = options;

  const templateDefinition = {
    AWSTemplateFormatVersion: AWS_TEMPLATE_FORMAT_VERSION,
    Description: description,
    Outputs: outputs,
    Resources: resources
  };

  return reduce(templateDefinition, (aggregator, value, key) => {
    if (isEmpty(value)) {
      return aggregator;
    } else {
      return assign({}, aggregator, { [key]: value });
    }
  }, {});
}

module.exports = CloudFormationTemplate;
