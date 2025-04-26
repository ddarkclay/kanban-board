import dotenv from 'dotenv';
import fs from 'fs';

const env = process.env.NODE_ENV || 'dev';
const envFile = `.env.${env}`;

if (fs.existsSync(envFile)) {
  dotenv.config({ path: envFile });
} else {
  console.warn(`${envFile} file not found. Falling back to default .env file`);
  dotenv.config();
}
