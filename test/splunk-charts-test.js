'use strict';

require('chai').should();

var splunk_charts = require('../splunk-charts.js');

var internals = {
};

describe(__filename, function() {

  describe('create', function() {

    describe('with a valid Splunk config', function() {
      var config;

      beforeEach(function() {
        config = internals.createValidSplunkConfig();
      });

      it('should return an object with public functions', function() {
        var instance = splunk_charts.create(config);
        instance.should.have.keys([
          'renderChartForSearch'
        ]);
      });

    });

    describe('with an invalid Splunk config', function() {
      var config;

      beforeEach(function() {
        config = internals.createValidSplunkConfig();
        delete config.username;
      });

      it('should throw an Error', function() {
        (function() {
          splunk_charts.create(config);
        }).should.throw();
      });

    });

  });

  describe('internals.validateSplunkConfig', function() {

    describe('with complete and valid params', function() {
      var config;

      beforeEach(function() {
        config = internals.createValidSplunkConfig();
      });

      it('should return validated object', function() {
        var validated = splunk_charts.internals.validateSplunkConfig(config);
        validated.should.have.keys([
          'username',
          'password',
          'scheme',
          'hostname',
          'port'
        ]);
      });

    });

    describe('with valid params, omitting port', function() {
      var config;

      beforeEach(function() {
        config = internals.createValidSplunkConfig();
        delete config.port;
      });

      it('should return validated object', function() {
        var validated = splunk_charts.internals.validateSplunkConfig(config);
        validated.should.have.keys([
          'username',
          'password',
          'scheme',
          'hostname'
        ]);
      });

    });

    describe('with invalid params', function() {
      var config;

      beforeEach(function() {
        config = internals.createValidSplunkConfig();
        delete config.username;
        delete config.password;
      });

      it('should throw error', function() {
        (function() {
          splunk_charts.internals.validateSplunkConfig(config);
        }).should.throw();
      });

    });

  });

});


internals.createValidSplunkConfig = function() {
  return {
    username: 'user',
    password: 'a-password-1',
    scheme: 'https',
    hostname: 'www.mysplunk.com',
    port: 8089
  };
};
