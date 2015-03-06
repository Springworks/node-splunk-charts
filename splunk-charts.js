'use strict';

var joi = require('joi');
var validator = require('./lib/validator.js');

var externals = {},
    internals = {
      splunk_config_validation_schema: joi.object().required().keys({
        username: joi.string().required(),
        password: joi.string().required(),
        scheme: joi.string().required(),
        hostname: joi.string().required(),
        port: joi.number().optional()
      })
    };

/**
 * Creates instance of splunk service and binds config to each external function.
 * @param {Object} splunk_config Splunk config
 * @return {Object} Instance with public functions
 */
exports.create = function(splunk_config) {
  var key,
      fn,
      validated_splunk_config;

  validated_splunk_config = internals.validateSplunkConfig(splunk_config);

  for (key in externals) {
    fn = externals[key];
    if (typeof fn === 'function') {
      fn.bind(null, validated_splunk_config);
    }
  }
  return externals;
};


externals.renderChartForSearch = function(splunk_config, params, callback) {
  // TODO: execute search and callback with chart url
};


internals.validateSplunkConfig = function(splunk_config) {
  return validator.validateParams(splunk_config, internals.splunk_config_validation_schema);
};


/* istanbul ignore else */
if (process.env.NODE_ENV === 'test') {
  /** @type Object */
  exports.externals = externals;

  /** @type Object */
  exports.internals = internals;
}
