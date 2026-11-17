-- Skema basis data Odette Medication Reminder
-- Dapat dijalankan pada PostgreSQL/Neon. Perintah menggunakan IF NOT EXISTS
-- agar aman dijalankan ulang pada basis data pengembangan.

CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(150) NOT NULL,
  password_hash TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE UNIQUE INDEX IF NOT EXISTS users_email_lower_unique
  ON users (LOWER(email));

CREATE TABLE IF NOT EXISTS medications (
  id SERIAL PRIMARY KEY,
  user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  name VARCHAR(150) NOT NULL,
  dosage VARCHAR(100) NOT NULL DEFAULT '',
  description TEXT NOT NULL DEFAULT '',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS medications_user_id_idx ON medications(user_id);

CREATE TABLE IF NOT EXISTS reminders (
  id SERIAL PRIMARY KEY,
  medication_id INTEGER NOT NULL REFERENCES medications(id) ON DELETE CASCADE,
  reminder_time TIME NOT NULL,
  reminder_date DATE,
  dose VARCHAR(100) NOT NULL DEFAULT '',
  frequency VARCHAR(30) NOT NULL DEFAULT 'Setiap Hari'
    CHECK (frequency IN ('Setiap Hari', 'Hari kerja', 'Satu kali')),
  start_date DATE,
  end_date DATE,
  is_active BOOLEAN NOT NULL DEFAULT TRUE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  CONSTRAINT reminders_date_order CHECK (end_date IS NULL OR start_date IS NULL OR end_date >= start_date)
);

ALTER TABLE reminders ADD COLUMN IF NOT EXISTS dose VARCHAR(100) NOT NULL DEFAULT '';
ALTER TABLE reminders ADD COLUMN IF NOT EXISTS frequency VARCHAR(30) NOT NULL DEFAULT 'Setiap Hari';
ALTER TABLE reminders ADD COLUMN IF NOT EXISTS start_date DATE;
ALTER TABLE reminders ADD COLUMN IF NOT EXISTS end_date DATE;
ALTER TABLE reminders ADD COLUMN IF NOT EXISTS is_active BOOLEAN NOT NULL DEFAULT TRUE;

UPDATE reminders
SET start_date = COALESCE(start_date, reminder_date, CURRENT_DATE)
WHERE start_date IS NULL;

ALTER TABLE reminders ALTER COLUMN start_date SET NOT NULL;

CREATE INDEX IF NOT EXISTS reminders_medication_id_idx ON reminders(medication_id);
CREATE INDEX IF NOT EXISTS reminders_active_time_idx ON reminders(is_active, reminder_time);

CREATE TABLE IF NOT EXISTS medication_logs (
  id SERIAL PRIMARY KEY,
  user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  reminder_id INTEGER NOT NULL REFERENCES reminders(id) ON DELETE CASCADE,
  medication_id INTEGER NOT NULL REFERENCES medications(id) ON DELETE CASCADE,
  taken_on DATE NOT NULL,
  status VARCHAR(20) NOT NULL CHECK (status IN ('Diminum', 'Terlewat')),
  taken_at TIMESTAMPTZ,
  notes TEXT NOT NULL DEFAULT '',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE (reminder_id, taken_on)
);

CREATE INDEX IF NOT EXISTS medication_logs_user_date_idx
  ON medication_logs(user_id, taken_on DESC);
