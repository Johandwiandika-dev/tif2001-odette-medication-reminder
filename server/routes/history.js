const express = require('express');
const pool = require('../db');

const router = express.Router();

router.get('/', async (req, res, next) => {
  try {
    const result = await pool.query(
      `SELECT l.id, l.reminder_id, l.medication_id, l.taken_on, l.status, l.taken_at, l.notes,
              m.name AS medication_name, COALESCE(r.dose, m.dosage, '') AS dose, r.reminder_time
       FROM medication_logs l
       JOIN medications m ON m.id = l.medication_id
       JOIN reminders r ON r.id = l.reminder_id
       WHERE l.user_id = $1
       ORDER BY l.taken_on DESC, r.reminder_time DESC`,
      [req.user.id],
    );
    res.json({ data: result.rows });
  } catch (error) { next(error); }
});

router.post('/reminders/:id/logs', async (req, res, next) => {
  try {
    const reminderId = Number(req.params.id);
    const { taken_on, status, notes = '' } = req.body;
    if (!Number.isInteger(reminderId) || reminderId <= 0) return res.status(400).json({ message: 'ID pengingat tidak valid.' });
    if (typeof taken_on !== 'string' || !/^\d{4}-\d{2}-\d{2}$/.test(taken_on) ||
        !['Diminum', 'Terlewat'].includes(status) || typeof notes !== 'string') {
      return res.status(400).json({ message: 'Data riwayat konsumsi tidak valid.' });
    }

    const owned = await pool.query(
      `SELECT r.id, r.medication_id FROM reminders r
       JOIN medications m ON m.id = r.medication_id
       WHERE r.id = $1 AND m.user_id = $2`,
      [reminderId, req.user.id],
    );
    if (!owned.rowCount) return res.status(404).json({ message: 'Pengingat tidak ditemukan.' });

    const medicationId = owned.rows[0].medication_id;
    const result = await pool.query(
      `INSERT INTO medication_logs (user_id, reminder_id, medication_id, taken_on, status, taken_at, notes)
       VALUES ($1, $2, $3, $4, $5, CASE WHEN $5 = 'Diminum' THEN NOW() ELSE NULL END, $6)
       ON CONFLICT (reminder_id, taken_on)
       DO UPDATE SET status = EXCLUDED.status, taken_at = EXCLUDED.taken_at, notes = EXCLUDED.notes
       RETURNING id, reminder_id, medication_id, taken_on, status, taken_at, notes`,
      [req.user.id, reminderId, medicationId, taken_on, status, notes.trim()],
    );
    res.status(201).json({ message: 'Riwayat konsumsi tersimpan.', data: result.rows[0] });
  } catch (error) { next(error); }
});

module.exports = router;
