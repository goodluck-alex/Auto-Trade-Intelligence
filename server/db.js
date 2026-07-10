import pg from 'pg';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.resolve(__dirname, '.env') });

const connectionString = process.env.DATABASE_URL;
if (!connectionString) {
  console.warn('DATABASE_URL is not set — auth will not persist across restarts.');
}

export const pool = connectionString
  ? new pg.Pool({ connectionString, ssl: { rejectUnauthorized: false } })
  : null;
