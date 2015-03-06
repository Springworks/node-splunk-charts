'use strict';

var externals = {},
    internals = {};

/**
 * Creates instance of splunk service and binds config to each external function.
 * @param {Object} splunk_config Splunk config
 * @return {Object} Instance with public functions
 */
exports.create = function(splunk_config) {
  var key,
      fn;

  for (key in externals) {
    fn = externals[key];
    if (typeof fn === 'function') {
      fn.bind(null, splunk_config);
    }
  }
  return externals;
};


externals.executeSearch = function(splunk_config, params, callback) {
  // TODO: execute search
};


/* istanbul ignore else */
if (process.env.NODE_ENV === 'test') {
  /** @type Object */
  exports.externals = externals;

  /** @type Object */
  exports.internals = internals;
}
