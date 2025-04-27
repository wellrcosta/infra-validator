require('dotenv').config();
const express = require('express');
const connectMongo = require('./config/mongoClient');
const router = require('./routes/index');

const app = express();
const port = 4000;

app.use(express.json());
app.use('/', router);

const startServer = async () => {
  await connectMongo();
  app.listen(port, () => console.log(`🚀 Infra-validator rodando na porta ${port}`));
};

startServer();
