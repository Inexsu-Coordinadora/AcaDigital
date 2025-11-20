import { Pool } from 'pg';
import { configuracion } from '../../../config/index.js';
import { config } from 'dotenv';

if (!process.env.DATABASE_URL) {
  console.error('ERROR: No se encontro DATABASE_URL, Asegurate de que tu archivo .env este en la raiz');

  process.exit(1);
}

export const pool = new Pool({
  connectionString: configuracion.DATABASE_URL
});