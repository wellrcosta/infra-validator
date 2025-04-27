const express = require('express');
const { testRedis } = require('../services/redisService');
const { testMongo } = require('../services/mongoService');
const { testPostgres } = require('../services/postgresService');
const { counter, client } = require('../utils/prometheus');

const router = express.Router();

router.get('/health', (req, res) => {
  res.send({ status: 'ok' });
});

router.get('/test/redis', async (req, res) => {
  counter.inc({ endpoint: '/test/redis' });
  const result = await testRedis();
  res.send({ result });
});

router.get('/test/mongo', async (req, res) => {
  counter.inc({ endpoint: '/test/mongo' });
  const result = await testMongo();
  res.send({ result });
});

router.get('/test/postgres', async (req, res) => {
  counter.inc({ endpoint: '/test/postgres' });
  const result = await testPostgres();
  res.send({ result });
});

router.get('/metrics', async (req, res) => {
  res.set('Content-Type', client.register.contentType);
  res.send(await client.register.metrics());
});

module.exports = router;
