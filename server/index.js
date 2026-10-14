require('dotenv').config();
const express = require('express');
const { Pool } = require('pg');

const app = express();
// Mengambil PORT dari .env, atau menggunakan port 5000 sebagai cadangan
const PORT = process.env.PORT || 5000;

// Konfigurasi koneksi database PostgreSQL menggunakan connection string dari .env
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

// Middleware untuk memparsing body berformat JSON
app.use(express.json());

// Endpoint untuk menguji koneksi ke database Neon PostgreSQL
app.get('/test-db', async (req, res) => {
  try {
    const result = await pool.query('SELECT NOW()');
    res.status(200).json({
      message: 'Koneksi database Neon berhasil!',
      currentTime: result.rows[0].now,
    });
  } catch (err) {
    console.error('Gagal terhubung ke database:', err);
    res.status(500).json({ error: 'Gagal terhubung ke database PostgreSQL' });
  }
});

// Endpoint utama
app.get('/', (req, res) => {
  res.send('Server Express.js & Neon PostgreSQL berjalan dengan baik!');
});

// Menjalankan server
app.listen(PORT, () => {
  console.log(`Server berjalan di http://localhost:${PORT}`);
});