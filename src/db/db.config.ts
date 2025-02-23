const { Client } = require('pg');
import dotenv from 'dotenv';

dotenv.config();

const pool = new Client({
  user: process.env.db_user,
  host: process.env.db_host,
  database: process.env.db_database,
  password: process.env.db_password,
  port: Number(process.env.db_port),
});

pool.connect()
  .then(() => console.log('Connected to PostgreSQL'))
  .catch((err: { stack: any; }) => console.error('Connection error', err.stack));

module.exports = pool;