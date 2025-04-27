const pool = require('../config/postgresClient');
const logger = require('../utils/logger');

const testPostgres = async () => {
  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS infra_validator (
        id SERIAL PRIMARY KEY,
        status VARCHAR(255),
        created_at TIMESTAMP DEFAULT NOW()
      )
    `);

    await pool.query('INSERT INTO infra_validator (status) VALUES ($1)', ['online']);

    const { rows } = await pool.query('SELECT * FROM infra_validator ORDER BY created_at DESC LIMIT 1');
    logger.info('PostgreSQL insert and select succeeded');
    return rows[0];
  } catch (error) {
    logger.error('PostgreSQL error', { error });
    throw error;
  }
};

module.exports = { testPostgres };
