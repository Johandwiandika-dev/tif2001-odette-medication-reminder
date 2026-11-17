# Spesifikasi API Odette

Alamat dasar lokal: `http://localhost:5000/api/v1`.

Semua permintaan yang memerlukan akun harus mengirim header:
`Authorization: Bearer <token>`.

Format data dan waktu menggunakan JSON. Tanggal menggunakan `YYYY-MM-DD`, sedangkan waktu menggunakan `HH:mm`.

## Pemeriksaan layanan

| Metode | Alamat | Akses | Keterangan |
|---|---|---|---|
| GET | `/health` | Publik | Memeriksa API dan koneksi PostgreSQL. |

## Autentikasi

### POST `/auth/register`

Isi: `{ "name": "Nama", "email": "nama@email.com", "password": "minimal-8-karakter" }`.

Mengembalikan data pengguna tanpa hash kata sandi dan token akses.

### POST `/auth/login`

Isi: `{ "email": "nama@email.com", "password": "kata-sandi" }`.

Mengembalikan data pengguna dan token akses apabila kredensial benar.

Token berlaku selama 24 jam. Kata sandi disimpan sebagai hash scrypt dengan salt acak, bukan teks biasa.

## Obat

Semua alamat berikut memerlukan autentikasi.

### GET `/medications`

Mengambil daftar obat milik pengguna yang sedang masuk.

### POST `/medications`

Isi: `{ "name": "Vitamin", "dosage": "1 tablet", "description": "Catatan" }`.

### PUT `/medications/:id`

Mengubah nama, dosis, dan deskripsi obat milik pengguna.

### DELETE `/medications/:id`

Menghapus obat milik pengguna. Pengingat dan riwayat terkait mengikuti aturan penghapusan berantai pada basis data.

## Pengingat

### GET `/reminders`

Mengambil jadwal pengingat milik pengguna.

### POST `/reminders`

Isi: `{ "medication_id": 1, "reminder_time": "08:00", "dose": "1 tablet", "frequency": "Setiap Hari", "start_date": "2026-11-18", "end_date": null }`.

Frekuensi yang didukung: `Setiap Hari`, `Hari kerja`, dan `Satu kali`.

### PUT `/reminders/:id`

Mengubah pengingat. Isi data mengikuti format pembuatan pengingat dan dapat menyertakan `is_active`.

### DELETE `/reminders/:id`

Menghapus pengingat milik pengguna.

## Riwayat konsumsi

### GET `/history`

Mengambil riwayat konsumsi milik pengguna.

### POST `/history/reminders/:id/logs`

Isi: `{ "taken_on": "2026-11-18", "status": "Diminum", "notes": "" }`.

Status yang didukung: `Diminum` atau `Terlewat`. Satu pengingat hanya memiliki satu catatan per tanggal; pengiriman ulang pada tanggal yang sama memperbarui catatan.

## Format kesalahan

Kesalahan dikembalikan sebagai JSON dengan properti `message`. Kode umum: 400 (data tidak valid), 401 (belum masuk atau token tidak valid), 404 (data tidak ditemukan), 409 (email sudah digunakan), dan 500 (kesalahan server).

## Catatan keamanan

- Jangan mengirim kata sandi database atau rahasia token ke frontend.
- Token harus disimpan dan dikirim dengan perlindungan yang sesuai.
- API membatasi akses data berdasarkan ID pengguna dari token, bukan ID pengguna yang dikirim browser.
- Gunakan HTTPS saat aplikasi dipasang di lingkungan produksi.

### DELETE `/history`

Menghapus seluruh riwayat konsumsi milik pengguna yang sedang masuk.
