const express = require('express');
const pool = require('../db');

const router = express.Router();

router.get('/', async (req, res, next) => {
  try {
    const result = await pool.query(
      'SELECT id, user_id, name, dosage, description, created_at FROM medications WHERE user_id = $1 ORDER BY created_at DESC',
      [req.user.id],
    );
    res.json({ data: result.rows });
  } catch (error) { next(error); }
});

router.post('/', async (req, res, next) => {
  try {
    const { name, dosage = '', description = '' } = req.body;
    if (typeof name !== 'string' || !name.trim() || name.trim().length > 150) {
      return res.status(400).json({ message: 'Nama obat wajib diisi dan maksimal 150 karakter.' });
    }
    if (typeof dosage !== 'string' || dosage.length > 100 || typeof description !== 'string') {
      return res.status(400).json({ message: 'Data dosis atau deskripsi tidak valid.' });
    }
    const result = await pool.query(
      'INSERT INTO medications (user_id, name, dosage, description) VALUES ($1, $2, $3, $4) RETURNING id, user_id, name, dosage, description, created_at',
      [req.user.id, name.trim(), dosage.trim(), description.trim()],
    );
    res.status(201).json({ message: 'Obat berhasil ditambahkan.', data: result.rows[0] });
  } catch (error) { next(error); }
});

router.put('/:id', async (req, res, next) => {
  try {
    const id = Number(req.params.id);
    const { name, dosage = '', description = '' } = req.body;
    if (!Number.isInteger(id) || id <= 0) return res.status(400).json({ message: 'ID obat tidak valid.' });
    if (typeof name !== 'string' || !name.trim() || name.trim().length > 150 ||
        typeof dosage !== 'string' || dosage.length > 100 || typeof description !== 'string') {
      return res.status(400).json({ message: 'Data obat tidak valid.' });
    }
    const result = await pool.query(
      'UPDATE medications SET name = $1, dosage = $2, description = $3 WHERE id = $4 AND user_id = $5 RETURNING id, user_id, name, dosage, description, created_at',
      [name.trim(), dosage.trim(), description.trim(), id, req.user.id],
    );
    if (!result.rowCount) return res.status(404).json({ message: 'Obat tidak ditemukan.' });
    res.json({ message: 'Data obat berhasil diperbarui.', data: result.rows[0] });
  } catch (error) { next(error); }
});

router.delete('/:id', async (req, res, next) => {
  try {
    const id = Number(req.params.id);
    if (!Number.isInteger(id) || id <= 0) return res.status(400).json({ message: 'ID obat tidak valid.' });
    const result = await pool.query('DELETE FROM medications WHERE id = $1 AND user_id = $2 RETURNING id', [id, req.user.id]);
    if (!result.rowCount) return res.status(404).json({ message: 'Obat tidak ditemukan.' });
    res.json({ message: 'Obat berhasil dihapus.' });
  } catch (error) { next(error); }
});

module.exports = router;
