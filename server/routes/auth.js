const express = require('express');
const crypto = require('node:crypto');
const { promisify } = require('node:util');
const pool = require('../db');
const { createToken } = require('../utils/token');

const router = express.Router();
const scrypt = promisify(crypto.scrypt);

function validEmail(value) {
  return typeof value === 'string' && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());
}

async function hashPassword(password) {
  const salt = crypto.randomBytes(16).toString('hex');
  const derived = await scrypt(password, salt, 64);
  return salt + ':' + derived.toString('hex');
}

async function verifyPassword(password, stored) {
  const [salt, hash] = String(stored).split(':');
  if (!salt || !hash) return false;
  const derived = await scrypt(password, salt, 64);
  const expected = Buffer.from(hash, 'hex');
  return expected.length === derived.length && crypto.timingSafeEqual(expected, derived);
}

router.post('/register', async (req, res, next) => {
  try {
    const name = typeof req.body.name === 'string' ? req.body.name.trim() : '';
    const email = typeof req.body.email === 'string' ? req.body.email.trim().toLowerCase() : '';
    const password = req.body.password;

    if (!name || name.length > 100) return res.status(400).json({ message: 'Nama wajib diisi dan maksimal 100 karakter.' });
    if (!validEmail(email) || email.length > 150) return res.status(400).json({ message: 'Alamat email tidak valid.' });
    if (typeof password !== 'string' || password.length < 8 || password.length > 128) {
      return res.status(400).json({ message: 'Kata sandi harus terdiri dari 8 sampai 128 karakter.' });
    }

    const passwordHash = await hashPassword(password);
    const result = await pool.query(
      'INSERT INTO users (name, email, password_hash) VALUES ($1, $2, $3) RETURNING id, name, email, created_at',
      [name, email, passwordHash],
    );
    const user = result.rows[0];
    const token = createToken({ sub: user.id, email: user.email });
    return res.status(201).json({ message: 'Pendaftaran berhasil.', user, token });
  } catch (error) {
    if (error.code === '23505') return res.status(409).json({ message: 'Email sudah terdaftar.' });
    return next(error);
  }
});

router.post('/login', async (req, res, next) => {
  try {
    const email = typeof req.body.email === 'string' ? req.body.email.trim().toLowerCase() : '';
    const password = req.body.password;
    if (!validEmail(email) || typeof password !== 'string' || !password) {
      return res.status(400).json({ message: 'Email dan kata sandi wajib diisi dengan benar.' });
    }

    const result = await pool.query(
      'SELECT id, name, email, password_hash, created_at FROM users WHERE lower(email) = $1 LIMIT 1',
      [email],
    );
    const user = result.rows[0];
    if (!user || !(await verifyPassword(password, user.password_hash))) {
      return res.status(401).json({ message: 'Email atau kata sandi salah.' });
    }

    const token = createToken({ sub: user.id, email: user.email });
    delete user.password_hash;
    return res.json({ message: 'Berhasil masuk.', user, token });
  } catch (error) {
    return next(error);
  }
});

module.exports = router;
