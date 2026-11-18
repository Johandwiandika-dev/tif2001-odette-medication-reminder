
const express = require('express');
const pool = require('../db');

const router = express.Router();

const ALLOWED_FREQUENCIES = [
  'Setiap Hari',
  'Hari kerja',
  'Satu kali',
];

// Memvalidasi tanggal kalender dengan format YYYY-MM-DD.
const validDate = (value) => {
  if (typeof value !== 'string' || !/^\d{4}-\d{2}-\d{2}$/.test(value)) {
    return false;
  }

  const date = new Date(`${value}T00:00:00.000Z`);

  return (
    !Number.isNaN(date.getTime()) &&
    date.toISOString().slice(0, 10) === value
  );
};

// Memvalidasi waktu HH:MM atau HH:MM:SS.
const validTime = (value) => {
  return (
    typeof value === 'string' &&
    /^([01]\d|2[0-3]):[0-5]\d(:[0-5]\d)?$/.test(value)
  );
};

// Memvalidasi seluruh data pengingat.
const validateReminder = (body) => {
  const {
    medication_id,
    reminder_time,
    dose,
    frequency,
    start_date,
    end_date,
    is_active = true,
  } = body;

  if (
    !Number.isInteger(Number(medication_id)) ||
    Number(medication_id) <= 0
  ) {
    return 'Obat yang dipilih tidak valid.';
  }

  if (!validTime(reminder_time)) {
    return 'Format waktu pengingat tidak valid.';
  }

  if (
    typeof dose !== 'string' ||
    !dose.trim() ||
    dose.trim().length > 100
  ) {
    return 'Dosis pengingat tidak valid.';
  }

  if (!ALLOWED_FREQUENCIES.includes(frequency)) {
    return 'Frekuensi pengingat tidak valid.';
  }

  if (!validDate(start_date)) {
    return 'Tanggal mulai tidak valid.';
  }

  if (end_date !== null && end_date !== undefined) {
    if (!validDate(end_date)) {
      return 'Tanggal selesai tidak valid.';
    }

    if (end_date < start_date) {
      return 'Tanggal selesai tidak boleh sebelum tanggal mulai.';
    }
  }

  if (typeof is_active !== 'boolean') {
    return 'Status aktif pengingat tidak valid.';
  }

  return null;
};

// Memastikan obat benar-benar milik pengguna.
const findOwnedMedication = async (medicationId, userId) => {
  return pool.query(
    `SELECT id
     FROM medications
     WHERE id = $1 AND user_id = $2`,
    [medicationId, userId],
  );
};

// GET: Mengambil semua pengingat milik pengguna.
router.get('/', async (req, res, next) => {
  try {
    const result = await pool.query(
      `SELECT
         r.id,
         r.medication_id,
         r.reminder_time,
         r.dose,
         r.frequency,
         TO_CHAR(r.start_date, 'YYYY-MM-DD') AS start_date,
         TO_CHAR(r.end_date, 'YYYY-MM-DD') AS end_date,
         r.is_active,
         r.created_at,
         m.name AS medication_name
       FROM reminders r
       JOIN medications m ON m.id = r.medication_id
       WHERE m.user_id = $1
       ORDER BY r.reminder_time ASC, r.id ASC`,
      [req.user.id],
    );

    res.json({
      data: result.rows,
    });
  } catch (error) {
    next(error);
  }
});

// POST: Membuat pengingat baru.
router.post('/', async (req, res, next) => {
  try {
    const validationError = validateReminder(req.body);

    if (validationError) {
      return res.status(400).json({
        message: validationError,
      });
    }

    const {
      medication_id,
      reminder_time,
      dose,
      frequency,
      start_date,
      end_date = null,
      is_active = true,
    } = req.body;

    const medication = await findOwnedMedication(
      Number(medication_id),
      req.user.id,
    );

    if (!medication.rowCount) {
      return res.status(404).json({
        message: 'Obat tidak ditemukan.',
      });
    }

    const result = await pool.query(
      `INSERT INTO reminders (
         medication_id,
         reminder_time,
         dose,
         frequency,
         start_date,
         end_date,
         is_active
       )
       VALUES ($1, $2, $3, $4, $5, $6, $7)
       RETURNING
         id,
         medication_id,
         reminder_time,
         dose,
         frequency,
         TO_CHAR(start_date, 'YYYY-MM-DD') AS start_date,
         TO_CHAR(end_date, 'YYYY-MM-DD') AS end_date,
         is_active,
         created_at`,
      [
        Number(medication_id),
        reminder_time,
        dose.trim(),
        frequency,
        start_date,
        end_date || null,
        is_active,
      ],
    );

    res.status(201).json({
      message: 'Pengingat berhasil dibuat.',
      data: result.rows[0],
    });
  } catch (error) {
    next(error);
  }
});

// PUT: Mengubah pengingat yang sudah ada.
router.put('/:id', async (req, res, next) => {
  try {
    const reminderId = Number(req.params.id);

    if (!Number.isInteger(reminderId) || reminderId <= 0) {
      return res.status(400).json({
        message: 'ID pengingat tidak valid.',
      });
    }

    const validationError = validateReminder(req.body);

    if (validationError) {
      return res.status(400).json({
        message: validationError,
      });
    }

    const {
      medication_id,
      reminder_time,
      dose,
      frequency,
      start_date,
      end_date = null,
      is_active = true,
    } = req.body;

    const medication = await findOwnedMedication(
      Number(medication_id),
      req.user.id,
    );

    if (!medication.rowCount) {
      return res.status(404).json({
        message: 'Obat tidak ditemukan.',
      });
    }

    const result = await pool.query(
      `UPDATE reminders r
       SET
         medication_id = $1,
         reminder_time = $2,
         dose = $3,
         frequency = $4,
         start_date = $5,
         end_date = $6,
         is_active = $7
       FROM medications m
       WHERE r.id = $8
         AND r.medication_id = m.id
         AND m.user_id = $9
       RETURNING
         r.id,
         r.medication_id,
         r.reminder_time,
         r.dose,
         r.frequency,
         TO_CHAR(r.start_date, 'YYYY-MM-DD') AS start_date,
         TO_CHAR(r.end_date, 'YYYY-MM-DD') AS end_date,
         r.is_active,
         r.created_at`,
      [
        Number(medication_id),
        reminder_time,
        dose.trim(),
        frequency,
        start_date,
        end_date || null,
        is_active,
        reminderId,
        req.user.id,
      ],
    );

    if (!result.rowCount) {
      return res.status(404).json({
        message: 'Pengingat tidak ditemukan.',
      });
    }

    res.json({
      message: 'Pengingat berhasil diperbarui.',
      data: result.rows[0],
    });
  } catch (error) {
    next(error);
  }
});

// DELETE: Menghapus pengingat milik pengguna.
router.delete('/:id', async (req, res, next) => {
  try {
    const reminderId = Number(req.params.id);

    if (!Number.isInteger(reminderId) || reminderId <= 0) {
      return res.status(400).json({
        message: 'ID pengingat tidak valid.',
      });
    }

    const result = await pool.query(
      `DELETE FROM reminders r
       USING medications m
       WHERE r.id = $1
         AND r.medication_id = m.id
         AND m.user_id = $2
       RETURNING r.id`,
      [reminderId, req.user.id],
    );

    if (!result.rowCount) {
      return res.status(404).json({
        message: 'Pengingat tidak ditemukan.',
      });
    }

    res.json({
      message: 'Pengingat berhasil dihapus.',
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
