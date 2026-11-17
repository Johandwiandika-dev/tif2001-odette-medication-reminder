# Odette Medication Reminder

## 1. Gambaran Umum

**Odette Medication Reminder** adalah aplikasi pengingat konsumsi obat untuk membantu pengguna mencatat obat dan mengatur jadwal pengingat.

Proyek ini dikembangkan sebagai bagian dari mata kuliah **Software Development (TIF2001)** dengan kolaborasi tim melalui Git dan GitHub.

## 2. Kondisi dan Teknologi Proyek

Teknologi yang benar-benar digunakan pada susunan kode saat ini:

- **Frontend:** HTML, CSS, dan JavaScript murni.
- **Backend:** Node.js dan Express.js.
- **Database:** PostgreSQL melalui Neon.
- **Pengujian frontend:** Jest.
- **Pemeriksaan kualitas kode:** ESLint dan Prettier.
- **Otomatisasi pemeriksaan:** GitHub Actions.

Catatan: frontend saat ini bukan aplikasi React atau Vite. Jangan menganggap fitur yang masih direncanakan sebagai fitur yang sudah selesai.

## 3. Susunan Repository

```text
tif2001-odette-medication-reminder/
├── .github/
│   ├── ISSUE_TEMPLATE/
│   │   ├── bug_report.md
│   │   └── feature_request.md
│   ├── workflows/
│   │   ├── ci.yml
│   │   ├── frontend-ci.yml
│   │   └── backend-ci.yml
│   ├── dependabot.yml
│   └── pull_request_template.md
├── client/
│   ├── .env.example
│   ├── eslint.config.mjs
│   ├── index.html
│   ├── package.json
│   ├── package-lock.json
│   ├── validation.js
│   └── validation.test.js
├── server/
│   ├── .env.example
│   ├── index.js
│   ├── package.json
│   └── package-lock.json
├── docs/
│   ├── api_specifications.md
│   └── database_schema.sql
├── .gitignore
├── LICENSE
└── README.md
```

Keterangan:
- `client/`: antarmuka aplikasi dan pengujian validasi frontend.
- `server/`: server Express.js dan koneksi PostgreSQL.
- `docs/`: dokumentasi rancangan API dan struktur database.
- `.github/workflows/`: pemeriksaan otomatis yang berjalan pada GitHub Actions.
- `.github/ISSUE_TEMPLATE/`: formulir pelaporan masalah dan usulan fitur.
- `.env.example`: contoh nama variabel konfigurasi tanpa nilai rahasia.
- `.gitignore`: daftar berkas lokal yang tidak boleh disimpan ke Git.

## 4. Persiapan Pengembangan

Perangkat yang diperlukan:
- Git.
- Node.js 22 atau versi yang sesuai dengan konfigurasi proyek.
- npm.
- Akun GitHub.
- Akses database PostgreSQL Neon saat pengujian koneksi database diperlukan.

Salin berkas contoh konfigurasi menjadi berkas `.env` lokal pada folder terkait, lalu isi nilainya sendiri:
- Frontend: `client/.env.example`
- Backend: `server/.env.example`

Jangan pernah mengirim berkas `.env`, kata sandi database, token, atau kunci rahasia ke repository. Gunakan GitHub Secrets atau pengaturan rahasia pada layanan hosting untuk kebutuhan otomatisasi dan penerapan aplikasi.

## 5. Alur Kerja GitHub

1. Ambil perubahan terbaru dari branch `main`.
2. Buat branch khusus untuk satu tugas.
3. Gunakan awalan nama branch yang sesuai:
   - `feat/`: penambahan fitur.
   - `fix/`: perbaikan kesalahan.
   - `docs/`: dokumentasi.
   - `ci/`: pemeriksaan dan otomatisasi.
   - `chore/`: pemeliharaan repository.
4. Kerjakan perubahan dan simpan dengan commit yang jelas.
5. Kirim branch ke GitHub.
6. Buat Pull Request dengan tujuan `main).
7. Minta anggota tim meninjau perubahan.
8. Pastikan seluruh pemeriksaan otomatis berhasil.
9. Gabungkan Pull Request setelah persyaratan peninjauan terpenuhi.
10. Perbarui branch lokal setelah penggabungan.

Contoh pesan commit:
- `feat: tambah fitur pengingat`
- `fix: perbaiki validasi formulir`
- `docs: perbarui dokumentasi`
- `ci: perbarui pemeriksaan otomatis`
- `chore: rapikan konfigurasi proyek`

Jangan mengerjakan fitur langsung pada `main`. Setiap perubahan harus melalui Pull Request.

## 6. Peran Tim

| Anggota | Peran | Tanggung Jawab |
|---|---|---|
| Citra Mayang Sari | Pengembang Frontend | Antarmuka pengguna dan validasi frontend. |
| Muhammad Faris Izzan Yasyfa | Pengembang Backend | API, autentikasi, logika aplikasi, dan integrasi database. |
| Johan Dwi Andika | Pengelola DevOps | Repository, alur otomatisasi, keamanan konfigurasi, dan tata cara kolaborasi Git. |

## 7. Pemeriksaan Otomatis

GitHub Actions menjalankan beberapa pemeriksaan ketika ada perubahan yang dikirim atau Pull Request dibuat menuju `main`:

- **Pemeriksaan repository:** memastikan berkas penting tersedia dan berkas rahasia `.env` tidak ikut tersimpan.
- **Pemeriksaan frontend:** memasang dependensi, menjalankan pengujian Jest, ESLint, dan pemeriksaan format.
- **Pemeriksaan backend:** memasang dependensi dan memeriksa sintaks JavaScript server.

Pemeriksaan sintaks backend belum menggantikan pengujian otomatis endpoint, autentikasi, atau integrasi database. Pengujian tersebut perlu ditambahkan ketika implementasi backend dan skenario uji sudah tersedia.

## 8. Keamanan Repository

- Jangan menyimpan berkas `.env` yang berisi kredensial asli.
- Simpan contoh variabel saja pada `.env.example`.
- Gunakan GitHub Secrets untuk nilai rahasia pada workflow.
- Batasi izin workflow sesuai kebutuhan.
- Tinjau perubahan sebelum menggabungkan Pull Request.
- Jika kredensial pernah terunggah, segera ganti atau cabut kredensial tersebut. Menghapus berkas dari versi terbaru tidak menghapus salinannya dari riwayat Git.

## 9. Status Proyek

Proyek masih dalam tahap pengembangan. Isi repository dan status Pull Request menjadi acuan kondisi terbaru. Dokumentasi harus diperbarui setiap kali struktur, teknologi, atau proses kerja berubah.
