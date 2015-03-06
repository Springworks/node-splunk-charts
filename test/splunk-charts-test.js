'use strict';

require('chai').should();

var splunk_charts = require('../splunk-charts.js');

describe(__filename, function() {

  describe('create', function() {

    describe('with a valid Splunk config', function() {
      var splunk_config = {
        // TODO: define
      };

      it('should return an object with public functions', function() {
        var instance = splunk_charts.create(splunk_config);
        instance.should.have.keys([
          'renderChartForSearch'
        ]);
      });

    });

  });

});
