const mongoose = require('mongoose');
const logger = require('../utils/logger');

const InfraValidator = mongoose.model('InfraValidator', new mongoose.Schema({
  status: String,
  timestamp: { type: Date, default: Date.now }
}));

const testMongo = async () => {
  try {
    const doc = new InfraValidator({ status: 'online' });
    await doc.save();
    logger.info('MongoDB document inserted');
    return doc;
  } catch (error) {
    logger.error('MongoDB error', { error });
    throw error;
  }
};

module.exports = { testMongo };
