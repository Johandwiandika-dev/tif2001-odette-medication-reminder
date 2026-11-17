# Odette Medication Reminder

Odette adalah aplikasi pengelolaan data obat, jadwal pengingat, dan riwayat konsumsi obat. Repository ini dikembangkan untuk mata kuliah Software Development (TIF2001).

## Status pengembangan

Branch `feature/fullstack-integration` menjadi ruang integrasi frontend, backend, dan PostgreSQL. Implementasi saat ini terdiri dari:
- **Frontend:** HTML, CSS, dan JavaScript pada `client/` (belum menggunakan React/Vite).
- **Backend:** Node.js dan Express 5 pada `server/`.
- **Database:** PostgreSQL melalui Neon.
- **Dokumentasi:** `docs/`.
- **Otomatisasi:** GitHub Actions pada `.github/workflows/`.

Backend menyediakan endpoint pendaftaran dan login, CRUD obat, CRUD pengingat, riwayat konsumsi, serta pemeriksaan kesehatan layanan. Frontend telah dihubungkan ke API untuk autentikasi, pengelolaan obat, jadwal, dan riwayat. Seluruh data utama disimpan pada PostgreSQL, bukan lagi penyimpanan browser. Skema database telah diterapkan dan diverifikasi pada branch `production` di proyek Neon `odette-medication-reminder` (database `neondb`) dengan tabel `users`, `medications`, `reminders`, dan `medication_logs`. Integrasi notifikasi saat browser tertutup dan pengujian end-to-end masih menjadi pekerjaan lanjutan. Jangan gunakan versi ini sebagai aplikasi produksi sebelum pengujian keamanan dan fungsional selesai.

## Persiapan backend

Persyaratan: Node.js 20 atau lebih baru, npm, dan database PostgreSQL.

1. Masuk ke folder `server/`.
2. Salin `.env.example` menjadi `.env`.
3. Ambil connection string dari Neon Console melalui tombol **Connect**, pilih branch `production`, database `neondb`, lalu salin connection string (gunakan opsi pooled jika tersedia).
4. Isi `DATABASE_URL` di `server/.env` dengan connection string tersebut. Buat `JWT_SECRET` acak minimal 32 karakter dan sesuaikan `CLIENT_ORIGIN`.
5. Pastikan `server/.env` tidak diunggah ke GitHub. File `.env` sudah diabaikan oleh `.gitignore`.
6. Pasang dependensi dengan `npm ci`.
7. Jalankan pemeriksaan sintaks dengan `npm run check` dan pengujian dengan `npm test`.
8. Jalankan API dengan `npm start`.
9. Buka `http://localhost:5000/api/v1/health`. Respons yang diharapkan: `{"status":"ok","database":"connected"}`.

API lokal: `http://localhost:5000`. Pemeriksaan koneksi database: `GET /api/v1/health`.

## Konfigurasi lingkungan

Backend menggunakan:
- `PORT`: port layanan (default 5000).
- `DATABASE_URL`: connection string PostgreSQL.
- `JWT_SECRET`: rahasia penandatangan token minimal 32 karakter.
- `CLIENT_ORIGIN`: origin frontend yang diizinkan oleh CORS.
- `NODE_ENV`: lingkungan aplikasi.

Jangan pernah mengunggah file `.env`. Gunakan `.env.example` hanya sebagai contoh nama variabel.

## Struktur repository

```text
.github/
  workflows/       Pemeriksaan otomatis
client/            Antarmuka pengguna
server/
  middleware/      Middleware autentikasi
  routes/          Endpoint API
  utils/           Utilitas token
  db.js            Koneksi PostgreSQL
  index.js         Titik masuk API
docs/
  api_specifications.md
  database_schema.sql
```

## Alur kerja Git

1. Kerjakan perubahan pada branch fitur, bukan langsung pada `main`.
2. Gunakan commit yang menjelaskan perubahan.
3. Periksa hasil CI dan tinjau diff sebelum membuat Pull Request.
4. Gabungkan ke `main hanya setelah pemeriksaan dan persetujuan.

## Keamanan

- Jangan menyimpan kredensial atau file `.env` di repository.
- Jika kredensial pernah terunggah, rotasi kredensial tersebut.
- Jangan menyimpan password pengguna dalam bentuk teks biasa.
- Endpoint privat memerlukan token dan memeriksa kepemilikan data.
- Gunakan HTTPS dan pengelolaan rahasia yang aman saat deployment.

## Dokumentasi

- [Spesifikasi API](docs/api_specifications.md)
- [Skema database](docs/database_schema.sql)
