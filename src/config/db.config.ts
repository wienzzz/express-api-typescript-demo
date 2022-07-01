import dotenv from 'dotenv';
import knex, { Knex } from 'knex';

dotenv.config();
export const configCore = {
  client: 'mysql2',
  connection: {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
  } 
} as Knex.Config;

export const dbCore: Knex = knex(configCore)

