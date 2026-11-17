require('dotenv').config();

const express = require('express');
const pool = require('./db');
const requireAuth = require('./middleware/auth');
const authRoutes = require('./routes/auth');
const medicationRoutes = require('./routes/medications');
const reminderRoutes = require('./routes/reminders');

const app = express();
const PORT = Number(process.env.PORT) || 5000;
const allowedOrigin = process.env.CLIENT_ORIGIN || 'http://localhost:5500';

app.disable('x-powered-by');
app.use((req, res, next) => {
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'DENY');
  res.setHeader('Referrer-Policy', 'no-referrer');
  const origin = req.headers.origin;
  if (origin && origin === allowedOrigin) {
    res.setHeader('Access-Control-Allow-Origin', origin);
    res.setHeader('Vary', 'Origin');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  }
  if (req.method === 'OPTIONS') return res.sendStatus(204);
  next();
});
app.use(express.json({ limit: '20kb' }));

app.get('/', (_req, res) => res.json({ name: 'Odette Medication Reminder API', status: 'running' }));
app.get('/api/v1/health', async (_req, res) => {
  try {
    await pool.query('SELECT 1');
    res.json({ status: 'ok', database: 'connected' });
  } catch {
    res.status(503).json({ status: 'error', database: 'unavailable' });
  }
});

app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/medications', requireAuth, medicationRoutes);
app.use('/api/v1/reminders', requireAuth, reminderRoutes);

app.use((req, res) => res.status(404).json({ message: 'Alamat API tidak ditemukan.' }));
app.use((error, _req, res, _next) => {
  console.error('Kesalahan API:', error.message);
  if (error.type === 'entity.too.large') return res.status(413).json({ message: 'Ukuran data terlalu besar.' });
  res.status(500).json({ message: 'Terjadi kesalahan pada server.' });
});

if (require.main === module) {
  const server = app.listen(PORT, () => console.log(`Odette API berjalan pada port ${PORT}`));
  const shutdown = async () => {
    server.close(async () => {
      await pool.end();
      process.exit(0);
    });
  };
  process.on('SIGINT', shutdown);
  process.on('SIGTERM', shutdown);
}

module.exports = app;
