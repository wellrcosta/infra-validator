const { createLogger, transports, format } = require('winston');
const LokiTransport = require('winston-loki');

const logger = createLogger({
  level: 'info',
  format: format.json(),
  transports: [
    new transports.Console(),
    new LokiTransport({
      host: process.env.LOKI_HOST,
      labels: { app: 'infra-validator' }
    })
  ],
});

module.exports = logger;
