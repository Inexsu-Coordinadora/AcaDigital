import { Pool, type PoolConfig } from 'pg';

const config: PoolConfig = {
  host: 'localhost',
  port: 5432,
  database: 'AcaDigital', 
  user: 'postgres',              
  password: 'postgres',          
  max: 20,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
};

export const pool = new Pool(config);

pool.on('error', (err, client) => {
  console.error('Error inesperado en un cliente inactivo', err);
  process.exit(-1);
});

