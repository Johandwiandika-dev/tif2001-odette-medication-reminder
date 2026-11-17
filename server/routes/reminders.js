const express = require('express');
const pool = require('../db');

const router = express.Router();
const validDate = (value) => typeof value === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(value) && !Number.isNaN(Date.parse(value));

router.get('/', async (req, res, next) => {
  try {
    const result = await pool.query(
      `SELECT r.id, r.medication_id, r.reminder_time, r.dose, r.frequency, r.start_date, r.end_date, r.is_active, r.created_at,
              m.name AS medication_name
       FROM reminders r JOIN medications m ON m.id = r.medication_id
       WHERE m.user_id = $1 ORDER BY r.reminder_time`,
      [req.user.id],
    );
    res.json({ data: result.rows });
  } catch (error) { next(error); }
});

router.post('/', async (req, res, next) => {
  try {
    const { medication_id, reminder_time, dose = '', frequency = 'Setiap Hari', start_date, end_date = null } = req.body;
    const medicationId = Number(medication_id);
    if (!Number.isInteger(medicationId) || medicationId <= 0) return res.status(400).json({ message: 'Obat wajib dipilih.' });
    if (typeof reminder_time !== 'string' || !/^([01]\d|2[0-3]):[0-5]\d$/.test(reminder_time)) return res.status(400).json({ message: 'Waktu pengingat tidak valid.' });
    if (!validDate(start_date) || (end_date !== null && end_date !== '' && !validDate(end_date))) return res.status(400).json({ message: 'Tanggal pengingat tidak valid.' });
    if (end_date && end_date < start_date) return res.status(400).json({ message: 'Tanggal akhir tidak boleh sebelum tanggal mulai.' });
    if (!['Setiap Hari', 'Hari kerja', 'Satu kali'].includes(frequency)) return res.status(400).json({ message: 'Frekuensi tidak valid.' });
    if (typeof dose !== 'string' || dose.length > 100) return res.status(400).json({ message: 'Dosis tidak valid.' });

    const owned = await pool.query('SELECT id FROM medications WHERE id = $1 AND user_id = $2', [medicationId, req.user.id]);
    if (!owned.rowCount) return res.status(404).json({ message: 'Obat tidak ditemukan.' });

    const result = await pool.query(
      'INSERT INTO reminders (medication_id, reminder_time, dose, frequency, start_date, end_date) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
      [medicationId, reminder_time, dose.trim(), frequency, start_date, end_date || null],
    );
    res.status(201).json({ message: 'Pengingat berhasil dibuat.', data: result.rows[0] });
  } catch (error) { next(error); }
});

router.put('/:id', async (req, res, next) => {
  try {
    const id = Number(req.params.id);
    const { medication_id, reminder_time, dose = '', frequency = 'Setiap Hari', start_date, end_date = null, is_active = true } = req.body;
    const medicationId = Number(medication_id);
    if (!Number.isInteger(id) || id <= 0 || !Number.isInteger(medicationId) || medicationId <= 0) return res.status(400).json({ message: 'ID pengingat atau obat tidak valid.' });
    if (typeof reminder_time !== 'string' || !/^([01]\d|2[0-3]):[0-5]\d$/.test(reminder_time) ||
        !validDate(start_date) || (end_date && !validDate(end_date)) || (end_date && end_date < start_date) ||
        !['Setiap Hari', 'Hari kerja', 'Satu kali'].includes(frequency) ||
        typeof dose !== 'string' || dose.length > 100 || typeof is_active !== 'boolean') {
      return res.status(400).json({ message: 'Data pengingat tidak valid.' });
    }
    const result = await pool.query(
      `UPDATE reminders r SET medication_id=$1, reminder_time=$2, dose=$3, frequency=$4, start_date=$5, end_date=$6, is_active=$7
       FROM medications m WHERE r.id=$8 AND r.medication_id=m.id AND m.user_id=$9
       AND EXISTS (SELECT 1 FROM medications owned WHERE owned.id=$1 AND owned.user_id=$9)
       RETURNING r.*`,
      [medicationId, reminder_time, dose.trim(), frequency, start_date, end_date || null, is_active, id, req.user.id],
    );
    if (!result.rowCount) return res.status(404).json({ message: 'Pengingat tidak ditemukan.' });
    res.json({ message: 'Pengingat berhasil diperbarui.', data: result.rows[0] });
  } catch (error) { next(error); }
});

router.delete('/:id', async (req, res, next) => {
  try {
    const id = Number(req.params.id);
    if (!Number.isInteger(id) || id <= 0) return res.status(400).json({ message: 'ID pengingat tidak valid.' });
    const result = await pool.query(
      'DELETE FROM reminders r USING medications m WHERE r.id=$1 AND r.medication_id=m.id AND m.user_id=$2 RETURNING r.id',
      [id, req.user.id],
    );
    if (!result.rowCount) return res.status(404).json({ message: 'Pengingat tidak ditemukan.' });
    res.json({ message: 'Pengingat berhasil dihapus.' });
  } catch (error) { next(error); }
});

module.exports = router;
