-- Baseline Database Schema
-- Project: TIF2001 Odette Medication Reminder

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(150) UNIQUE NOT NULL,
    password_hash TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE medications (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL,
    name VARCHAR(150) NOT NULL,
    dosage VARCHAR(100),
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_medication_user
        FOREIGN KEY (user_id)
        REFERENCES users(id)
        ON DELETE CASCADE
);

CREATE TABLE reminders (
    id SERIAL PRIMARY KEY,
    medication_id INTEGER NOT NULL,
    reminder_time TIME NOT NULL,
    reminder_date DATE,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_reminder_medication
        FOREIGN KEY (medication_id)
        REFERENCES medications(id)
        ON DELETE CASCADE
);
