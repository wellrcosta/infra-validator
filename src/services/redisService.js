const redis = require('../config/redisClient');
const logger = require('../utils/logger');

const testRedis = async () => {
  try {
    await redis.set('infra-validator', 'online');
    const result = await redis.get('infra-validator');
    logger.info('Redis set and get succeeded');
    return result;
  } catch (error) {
    logger.error('Redis error', { error });
    throw error;
  }
};

module.exports = { testRedis };
