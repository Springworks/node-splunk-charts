'use strict';

var request = require('request');

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
    if (externals.hasOwnProperty(key)) {
      fn = externals[key];
      if (typeof fn === 'function') {
        fn.bind(null, splunk_config);
      }
    }
  }

  return externals;
};


externals.executeSearch = function(splunk_config, query, callback) {
  var url = splunk_config.scheme +
            '://' +
            splunk_config.hostname;

  if (splunk_config.port) {
    url += ':' + splunk_config.port;
  }

  url += '/services/search/jobs/oneshot';

  request
      .post({
        url: url,
        json: true,
        qs: {
          output_mode: 'json_rows'
        },
        auth: {
          user: splunk_config.username,
          password: splunk_config.password
        },
        form: {
          search: query
        }
      },
      function(err, response, body) {
        if (err) {
          callback(new Error('Search failed with error: ' + err.message), null);
          return;
        }

        if (response.statusCode !== 200) {
          callback(new Error('Search failed with error status code: ' + response.statusCode), null);
          return;
        }

        callback(null, body);
      });
};


/* istanbul ignore else */
if (process.env.NODE_ENV === 'test') {
  /** @type Object */
  exports.externals = externals;

  /** @type Object */
  exports.internals = internals;
}
