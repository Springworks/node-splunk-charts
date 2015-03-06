# splunk-charts

[![Build Status](https://travis-ci.org/Springworks/node-splunk-charts.png?branch=master)](https://travis-ci.org/Springworks/node-splunk-charts)
[![Coverage Status](https://coveralls.io/repos/Springworks/node-splunk-charts/badge.png?branch=master)](https://coveralls.io/r/Springworks/node-splunk-charts?branch=master)

## API

### Create instance: `create(splunk_config)`

Creates an instance using the splunk config. The instance is required to execute any functions.

Throws `Error` if config is invalid.

```js
var splunk_charts = require('splunk-charts');
var instance = splunk_charts.create({
  username: 'mr-splunk',
  password: 'secret-of-the-user',
  scheme: 'https',
  hostname: 'www.mysplunk.com',
  port: 8089
});
```


### Render chart: `instance.renderChartForSearch(params, callback)`

Renders a chart image for a Splunk search, defined by the provided `params`.

```js
var chart_params = {
  ...
};
instance.renderChartForSearch(chart_params, function(err, image_url) {
  assert(err === null);
  assert(typeof image_url === 'string');
});
```

## Contributing

1. Make a branch
2. Write tests
3. Write implementation until all tests pass
4. Make a pull request

## License

MIT
