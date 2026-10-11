# Odette Medication Reminder

## 1. Project Overview

**Odette Medication Reminder** adalah proyek aplikasi pengingat konsumsi obat yang dikembangkan untuk membantu pengguna mengelola data obat dan jadwal pengingat secara lebih teratur.

Proyek ini dikembangkan sebagai bagian dari mata kuliah **Software Development (TIF2001)** dengan menerapkan kolaborasi tim menggunakan Git dan GitHub.

### Project Objectives

- Membantu pengguna mencatat dan mengelola data obat.
- Menyediakan fitur pengelolaan jadwal pengingat konsumsi obat.
- Menyediakan autentikasi pengguna melalui registrasi dan login.
- Membangun aplikasi dengan pemisahan frontend, backend, dan dokumentasi.
- Menerapkan version control, code review, serta automated validation melalui GitHub Actions.

### Planned Features

- User registration and login.
- Medication data management.
- Medication reminder scheduling.
- Frontend form validation.
- Backend API dan integrasi database PostgreSQL.

*Catatan: fitur-fitur tersebut merupakan target pengembangan dan belum tentu seluruhnya tersedia pada versi saat ini.*

## 2. Technology Stack

Teknologi yang direncanakan untuk pengembangan proyek ini meliputi:

- **Frontend:** React dan Vite.
- **Backend:** Node.js dan Express.js.
- **Database:** PostgreSQL menggunakan Neon.
- **Version Control:** Git dan GitHub.
- **DevOps:** GitHub Actions untuk validasi repository dan pengembangan CI.
- **API:** REST API.

## 3. Repository Structure

```text
tif2001-odette-medication-reminder/
├── .github/
│   ├── ISSUE_TEMPLATE/
│   │   ├── bug_report.md
│   │   └── feature_request.md
│   ├── workflows/
│   │   └── ci.yml
│   └── pull_request_template.md
├── client/
│   └── .env.example
├── server/
│   └── .env.example
├── docs/
│   ├── api_specifications.md
│   └── database_schema.sql
├── .gitignore
├── LICENSE
└── README.md
```

### Directory Description

- `client/`: tempat pengembangan antarmuka pengguna atau frontend.
- `server/`: tempat pengembangan backend, API, autentikasi, dan koneksi database.
- `docs/`: menyimpan dokumentasi API dan rancangan skema database.
- `.github/ISSUE_TEMPLATE/`: template untuk melaporkan bug dan mengusulkan fitur.
- `.github/workflows/`: konfigurasi workflow GitHub Actions.
- `.github/pull_request_template.md`: panduan isi Pull Request.
- `.env.example`: contoh variabel environment tanpa kredensial asli.
- `.gitignore`: menentukan file dan folder yang tidak boleh dilacak oleh Git.

## 4. Environment Setup

### Prerequisites

Persiapan pengembangan memerlukan:

- Git.
- Node.js dan npm untuk pengembangan aplikasi berbasis JavaScript.
- Akun GitHub.
- Akses ke database PostgreSQL Neon saat integrasi database diperlukan.

### Environment Variables

Sebelum aplikasi dijalankan, konfigurasi environment perlu disiapkan berdasarkan file contoh berikut:

- Frontend: `client/.env.example`
- Backend: `server/.env.example`

Untuk konfigurasi lokal, buat file `.env` pada folder terkait dan isi dengan nilai environment yang sesuai.

Contoh variabel frontend:

```env
VITE_API_BASE_URL=http://localhost:5000/api/v1
```

Contoh variabel backend:

```env
PORT=5000
DATABASE_URL=your_postgresql_connection_string
JWT_SECRET=your_long_random_secret
NODE_ENV=development
```

Ganti nilai placeholder dengan konfigurasi lokal yang benar. Jangan menaruh password database, JWT secret, atau kredensial asli di README, repository publik, maupun file `.env.example`.

Pastikan file `.env` diabaikan oleh `.gitignore` dan tidak ikut di-commit atau di-push ke GitHub.

### Documentation

Dokumentasi awal proyek tersedia di:

- `docs/api_specifications.md` — rancangan endpoint API.
- `docs/database_schema.sql` — skema database PostgreSQL.

Dokumentasi tersebut perlu diperbarui apabila desain API atau database berubah selama pengembangan.

## 5. Git and Pull Request Workflow

Proyek ini menggunakan Git dan GitHub untuk kolaborasi serta pengelolaan perubahan kode.

### Development Workflow

1. Sinkronkan branch utama dengan repository remote.
2. Buat branch baru untuk setiap tugas atau perbaikan.
3. Lakukan perubahan sesuai issue yang dikerjakan.
4. Commit perubahan dengan pesan yang jelas.
5. Push branch ke GitHub.
6. Buat Pull Request menuju branch `main`.
7. Minta anggota tim melakukan review dan approval.
8. Perbaiki perubahan jika diperlukan.
9. Merge Pull Request setelah persyaratan review terpenuhi.
10. Sinkronkan kembali branch lokal dengan `main`.

### Branch Naming Convention

Gunakan awalan nama branch sesuai jenis pekerjaan, misalnya:

- `feat/` — penambahan fitur.
- `fix/` — perbaikan bug.
- `docs/` — perubahan dokumentasi.
- `ci/` — konfigurasi Continuous Integration.
- `chore/` — pemeliharaan repository.

Contoh: `docs/update-readme`.

### Commit Message Convention

Gunakan prefix yang konsisten, misalnya:

- `feat:` untuk fitur baru.
- `fix:` untuk perbaikan.
- `docs:` untuk dokumentasi.
- `ci:` untuk konfigurasi CI.
- `chore:` untuk pemeliharaan repository.

Contoh:

```text
docs: improve project README
```

Perubahan ke `main` harus mengikuti aturan branch protection dan proses review repository. Jangan memasukkan kredensial atau file environment rahasia ke dalam commit.

## 6. Team Roles and Responsibilities

Pembagian tanggung jawab tim:

| Member | Role | Responsibilities |
|---|---|---|
| Citra Mayang Sari | Frontend Developer | Mengembangkan antarmuka pengguna, komponen frontend, dan validasi form di sisi klien. |
| Muhammad Faris Izzan Yasyfa | Backend Developer | Mengembangkan API, autentikasi, logika bisnis, dan integrasi database. |
| Johan Dwi Andika | DevOps Engineer | Mengelola repository, workflow GitHub Actions, konfigurasi environment, dokumentasi teknis, dan praktik kolaborasi Git. |

Setiap anggota bertanggung jawab untuk menjaga kualitas perubahan, mengikuti alur Pull Request, dan berkoordinasi melalui GitHub Issues serta GitHub Projects.

## 7. DevOps and CI

Repository menggunakan GitHub Actions untuk menjalankan validasi otomatis terhadap struktur dan file penting repository.

Workflow saat ini memeriksa keberadaan beberapa file dokumentasi dan konfigurasi environment contoh.

Validasi struktur repository ini merupakan langkah awal CI dan **belum sama dengan pengujian otomatis aplikasi, linting, atau pengujian integrasi database**. Pemeriksaan tersebut dapat ditambahkan ketika kode frontend dan backend sudah tersedia.

## 8. Project Management

GitHub Issues digunakan untuk mencatat tugas, kebutuhan fitur, dan bug. GitHub Projects digunakan untuk memantau status pekerjaan serta pembagian tugas anggota tim.

Setiap perubahan sebaiknya terkait dengan issue yang relevan dan diajukan melalui Pull Request agar riwayat perubahan dapat ditinjau.

## 9. Security Notes

- Jangan commit file `.env` yang berisi kredensial asli.
- Jangan menampilkan password database atau JWT secret dalam dokumentasi.
- Gunakan `.env.example` hanya untuk nama variabel dan placeholder.
- Jika kredensial terungkap, segera rotasi kredensial tersebut.
- Tinjau perubahan sebelum menggabungkan Pull Request ke `main`.

## 10. Project Status

Proyek berada dalam tahap pengembangan. Struktur awal repository, dokumentasi dasar, dan konfigurasi validasi repository menjadi fondasi untuk implementasi frontend, backend, autentikasi, serta integrasi database selanjutnya.
