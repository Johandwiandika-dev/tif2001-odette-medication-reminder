const { Pool } = require('pg');

if (!process.env.DATABASE_URL) {
  throw new Error('DATABASE_URL belum diatur. Salin server/.env.example menjadi server/.env dan isi konfigurasi lokal.');
}

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : undefined,
  max: 10,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 10000,
});

pool.on('error', (error) => {
  console.error('Kesalahan koneksi database yang tidak terpakai:', error.message);
});

module.exports = pool;
