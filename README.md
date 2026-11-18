# Odette Medication Reminder

Odette adalah aplikasi pengelolaan data obat, jadwal pengingat, dan riwayat konsumsi obat. Repository ini dikembangkan untuk mata kuliah Software Development (TIF2001).

## Status pengembangan

Branch `feature/fullstack-integration` menjadi ruang integrasi frontend, backend, dan PostgreSQL. Implementasi saat ini terdiri dari:

- **Frontend:** HTML, CSS, dan JavaScript pada `client/` (belum menggunakan React/Vite).
- **Backend:** Node.js dan Express 5 pada `server/`.
- **Database:** PostgreSQL melalui Neon.
- **Dokumentasi:** `docs/`.
- **Otomatisasi:** GitHub Actions pada `.github/workflows/`.

Backend menyediakan autentikasi, CRUD obat, CRUD pengingat, riwayat konsumsi, dan pemeriksaan kesehatan layanan. Frontend terhubung ke API untuk autentikasi, pengelolaan obat, jadwal, dan riwayat.

Aplikasi masih dalam tahap pengembangan. Notifikasi ketika browser tertutup dan pengujian end-to-end masih menjadi pekerjaan lanjutan. Jangan gunakan versi ini sebagai aplikasi produksi sebelum pengujian keamanan dan fungsional selesai.

## Persiapan

Persyaratan:

- Node.js 20 atau lebih baru.
- npm.
- Akun/proyek PostgreSQL di Neon.
- Python 3 untuk menjalankan frontend statis (atau server file statis lain).

## Persiapan database Neon

**Penting: gunakan branch database pengembangan, bukan `production`.** Jangan memakai connection string production untuk menjalankan aplikasi lokal, pengujian, atau migrasi selama pengembangan.

1. Buka Neon Console dan pilih proyek database Odette.
2. Pilih branch `development` yang disediakan untuk pekerjaan pengembangan. Jika branch tersebut belum tersedia, buat branch pengembangan terpisah sesuai kebijakan tim.
3. Pastikan database yang dipilih adalah `neondb` (atau database pengembangan yang telah ditentukan tim).
4. Klik **Connect**, pastikan branch yang terpilih adalah branch pengembangan, lalu salin connection string. Gunakan pooled connection jika tersedia.
5. Jika menyiapkan database pengembangan baru, jalankan isi `docs/database_schema.sql` pada database/branch pengembangan tersebut melalui Neon SQL Editor.
6. Jangan menjalankan skema atau pengujian pada branch `production`.

Setiap anggota tim sebaiknya memakai branch pengembangan pribadi atau branch bersama yang telah disepakati. Jangan saling menimpa data pengembangan milik anggota tim lain.

## Menjalankan backend

1. Buka terminal dan masuk ke folder backend:

   ```bash
   cd server
   ```

2. Salin `.env.example` menjadi `.env`.

   Windows PowerShell:

   ```powershell
   Copy-Item .env.example .env
   ```

   macOS/Linux:

   ```bash
   cp .env.example .env
   ```

3. Isi variabel pada `server/.env`:

   - `PORT=5000`
   - `DATABASE_URL`: connection string dari branch Neon **development**, bukan production.
   - `JWT_SECRET`: rahasia acak minimal 32 karakter.
   - `CLIENT_ORIGIN=http://localhost:5500`
   - `NODE_ENV=development`

   Jangan mengirim atau membagikan isi `.env`, `DATABASE_URL`, maupun `JWT_SECRET` melalui chat, issue, commit, atau Pull Request.

4. Pasang dependensi dan jalankan pemeriksaan:

   ```bash
   npm ci
   npm run check
   npm test
   ```

5. Jalankan API:

   ```bash
   npm start
   ```

6. Periksa endpoint kesehatan di [http://localhost:5000/api/v1/health](http://localhost:5000/api/v1/health). Respons yang diharapkan:

   ```json
   {
     "status": "ok",
     "database": "connected"
   }
   ```

API lokal berjalan pada `http://localhost:5000`.

## Menjalankan frontend

Jalankan backend terlebih dahulu. Buka terminal kedua:

1. Masuk ke folder frontend:

   ```bash
   cd client
   ```

2. Jalankan server file statis:

   ```bash
   python -m http.server 5500
   ```

3. Buka [http://localhost:5500](http://localhost:5500) di browser.

Frontend menggunakan konfigurasi API di `client/config.js`, dengan alamat lokal default `http://localhost:5000/api/v1`. Ubah konfigurasi tersebut hanya jika alamat backend berbeda.

## Pengujian frontend

Dari folder `client/`, jalankan:

```bash
npm ci
npm test
npm run lint
```

## Konfigurasi lingkungan backend

Backend menggunakan variabel berikut:

| Variabel | Keterangan |
|---|---|
| `PORT` | Port layanan (default 5000). |
| `DATABASE_URL` | Connection string PostgreSQL dari branch pengembangan Neon. |
| `JWT_SECRET` | Rahasia penandatangan token, minimal 32 karakter. |
| `CLIENT_ORIGIN` | Origin frontend yang diizinkan oleh CORS. |
| `NODE_ENV` | Lingkungan aplikasi, gunakan `development` untuk pengembangan lokal. |

Jangan pernah mengunggah file `.env`. Gunakan `.env.example` hanya sebagai contoh nama variabel dan format konfigurasi.

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
2. Sebelum mulai, periksa branch aktif dan sinkronkan branch kerja dengan remote.
3. Buat commit yang menjelaskan perubahan.
4. Periksa hasil CI dan tinjau diff sebelum membuat Pull Request.
5. Gabungkan ke `main` hanya setelah pemeriksaan dan persetujuan tim.

## Keamanan

- Jangan menyimpan kredensial atau file `.env` di repository.
- Jika kredensial pernah terunggah, segera rotasi kredensial tersebut.
- Jangan menyimpan password pengguna dalam bentuk teks biasa.
- Endpoint privat memerlukan token dan memeriksa kepemilikan data.
- Gunakan HTTPS dan pengelolaan rahasia yang aman saat deployment.
- Jangan gunakan database production untuk pengembangan atau pengujian lokal.

## Dokumentasi

- [Spesifikasi API](docs/api_specifications.md)
- [Skema database](docs/database_schema.sql)
