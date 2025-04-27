const client = require('prom-client');

const counter = new client.Counter({
  name: 'infra_validator_requests_total',
  help: 'Total number of requests received',
  labelNames: ['endpoint']
});

const collectDefaultMetrics = client.collectDefaultMetrics;
collectDefaultMetrics();

module.exports = { counter, client };
