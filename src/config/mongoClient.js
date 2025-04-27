const mongoose = require('mongoose');

const connectMongo = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, { dbName: 'infra-validator' });
    console.log('✅ Conectado ao MongoDB');
  } catch (error) {
    console.error('❌ Erro ao conectar no MongoDB:', error);
    process.exit(1);
  }
};

module.exports = connectMongo;
