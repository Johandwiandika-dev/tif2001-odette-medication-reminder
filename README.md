# Odette Medication Reminder

## 1. Gambaran Umum Proyek

**Odette Medication Reminder** adalah proyek aplikasi pengingat konsumsi obat yang dikembangkan untuk membantu pengguna mengelola data obat dan jadwal pengingat secara lebih teratur.

Proyek ini dikembangkan sebagai bagian dari mata kuliah **Software Development (TIF2001)** dengan menerapkan kolaborasi tim menggunakan Git dan GitHub.

### Tujuan Proyek

- Membantu pengguna mencatat dan mengelola data obat.
- Menyediakan fitur pengelolaan jadwal pengingat konsumsi obat.
- Menyediakan autentikasi pengguna melalui pendaftaran dan masuk ke akun.
- Membangun aplikasi dengan pemisahan frontend, backend, dan dokumentasi.
- Menerapkan pengelolaan versi kode, peninjauan kode, serta pemeriksaan otomatis melalui GitHub Actions.

### Fitur yang Direncanakan

- Pendaftaran pengguna dan masuk ke akun.
- Pengelolaan data obat.
- Pengaturan jadwal pengingat konsumsi obat.
- Pemeriksaan isian formulir pada frontend.
- API backend dan integrasi database PostgreSQL.

*Catatan: fitur-fitur tersebut merupakan target pengembangan dan belum tentu seluruhnya tersedia pada versi saat ini.*

## 2. Teknologi yang Digunakan

Teknologi yang direncanakan untuk pengembangan proyek ini meliputi:

- **Frontend:** React dan Vite.
- **Backend:** Node.js dan Express.js.
- **Database:** PostgreSQL menggunakan Neon.
- **Pengelolaan versi kode:** Git dan GitHub.
- **DevOps:** GitHub Actions untuk pemeriksaan repository dan pengembangan CI.
- **API:** REST API.

## 3. Susunan Folder Repository

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

### Keterangan Folder dan Berkas

- `client/`: tempat pengembangan antarmuka pengguna atau frontend.
- `server/`: tempat pengembangan backend, API, autentikasi, dan koneksi database.
- `docs/`: menyimpan dokumentasi API dan rancangan struktur database.
- `.github/ISSUE_TEMPLATE/`: contoh formulir untuk melaporkan bug dan mengusulkan fitur.
- `.github/workflows/`: pengaturan alur kerja otomatis GitHub Actions.
- `.github/pull_request_template.md`: panduan pengisian permintaan penggabungan perubahan.
- `.env.example`: contoh nama variabel konfigurasi tanpa kredensial asli.
- `.gitignore`: menentukan berkas dan folder yang tidak boleh dilacak oleh Git.

## 4. Persiapan Lingkungan Pengembangan

### Perangkat yang Dibutuhkan

Persiapan pengembangan memerlukan:

- Git.
- Node.js dan npm untuk pengembangan aplikasi berbasis JavaScript.
- Akun GitHub.
- Akses ke database PostgreSQL Neon saat integrasi database diperlukan.

### Variabel Konfigurasi

Sebelum aplikasi dijalankan, konfigurasi lingkungan perlu disiapkan berdasarkan berkas contoh berikut:

- Frontend: `client/.env.example`
- Backend: `server/.env.example`

Untuk konfigurasi lokal, buat berkas bernama `.env` pada folder terkait dan isi dengan nilai konfigurasi yang sesuai.

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

Ganti nilai contoh dengan konfigurasi lokal yang benar. Jangan menaruh kata sandi database, JWT secret, atau kredensial asli di README, repository publik, maupun berkas `.env.example`.

Pastikan berkas `.env` diabaikan oleh `.gitignore` dan tidak ikut disimpan atau dikirim ke GitHub.

### Dokumentasi Teknis

Dokumentasi awal proyek tersedia di:

- `docs/api_specifications.md` — rancangan alamat dan fungsi API.
- `docs/database_schema.sql` — struktur database PostgreSQL.

Dokumentasi tersebut perlu diperbarui apabila rancangan API atau database berubah selama pengembangan.

## 5. Alur Kerja Git dan Permintaan Penggabungan

Proyek ini menggunakan Git dan GitHub untuk kolaborasi serta pengelolaan perubahan kode.

### Tahapan Pengerjaan

1. Sinkronkan branch utama dengan repository GitHub.
2. Buat branch baru untuk setiap tugas atau perbaikan.
3. Lakukan perubahan sesuai issue yang dikerjakan.
4. Simpan perubahan dengan commit dan pesan yang jelas.
5. Kirim branch ke GitHub menggunakan push.
6. Buat Pull Request menuju branch `main`.
7. Minta anggota tim meninjau dan menyetujui perubahan.
8. Perbaiki perubahan jika diperlukan.
9. Gabungkan Pull Request setelah persyaratan peninjauan terpenuhi.
10. Sinkronkan kembali branch lokal dengan `main`.

### Aturan Penamaan Branch

Gunakan awalan nama branch sesuai jenis pekerjaan, misalnya:

- `feat/` — penambahan fitur.
- `fix/` — perbaikan kesalahan.
- `docs/` — perubahan dokumentasi.
- `ci/` — konfigurasi pemeriksaan otomatis.
- `chore/` — pemeliharaan repository.

Contoh: `docs/update-readme`.

### Aturan Pesan Commit

Gunakan awalan pesan yang konsisten:

- `feat:` untuk fitur baru.
- `fix:` untuk perbaikan.
- `docs:` untuk dokumentasi.
- `ci:` untuk konfigurasi pemeriksaan otomatis.
- `chore:` untuk pemeliharaan repository.

Contoh:

```text
docs: perbarui dokumentasi proyek
```

Perubahan ke `main` harus mengikuti aturan perlindungan branch dan proses peninjauan repository. Jangan memasukkan kredensial atau berkas konfigurasi rahasia ke dalam commit.

## 6. Peran dan Tanggung Jawab Tim

Pembagian tanggung jawab tim:

| Anggota | Peran | Tanggung Jawab |
|---|---|---|
| Citra Mayang Sari | Pengembang Frontend | Mengembangkan antarmuka pengguna, komponen frontend, dan pemeriksaan formulir di sisi pengguna. |
| Muhammad Faris Izzan Yasyfa | Pengembang Backend | Mengembangkan API, autentikasi, logika aplikasi, dan integrasi database. |
| Johan Dwi Andika | Pengelola DevOps | Mengelola repository, alur kerja GitHub Actions, konfigurasi lingkungan, dokumentasi teknis, dan tata cara kolaborasi Git. |

Setiap anggota bertanggung jawab menjaga kualitas perubahan, mengikuti alur Pull Request, dan berkoordinasi melalui GitHub Issues serta GitHub Projects.

## 7. DevOps dan Pemeriksaan Otomatis (CI)

Repository menggunakan GitHub Actions untuk menjalankan pemeriksaan otomatis terhadap susunan dan berkas penting repository.

Alur kerja saat ini memeriksa keberadaan beberapa berkas dokumentasi dan contoh konfigurasi lingkungan.

Pemeriksaan susunan repository ini merupakan langkah awal CI dan **belum sama dengan pengujian otomatis aplikasi, pemeriksaan kualitas kode, atau pengujian integrasi database**. Pemeriksaan tersebut dapat ditambahkan ketika kode frontend dan backend sudah tersedia.

## 8. Pengelolaan Proyek

GitHub Issues digunakan untuk mencatat tugas, kebutuhan fitur, dan bug. GitHub Projects digunakan untuk memantau status pekerjaan serta pembagian tugas anggota tim.

Setiap perubahan sebaiknya terkait dengan issue yang relevan dan diajukan melalui Pull Request agar riwayat perubahan dapat ditinjau.

## 9. Catatan Keamanan

- Jangan menyimpan berkas `.env` yang berisi kredensial asli ke repository.
- Jangan menampilkan kata sandi database atau JWT secret dalam dokumentasi.
- Gunakan `.env.example` hanya untuk nama variabel dan nilai contoh.
- Jika kredensial terungkap, segera ganti kredensial tersebut.
- Tinjau perubahan sebelum menggabungkan Pull Request ke `main`.

## 10. Status Proyek

Proyek berada dalam tahap pengembangan. Struktur awal repository, dokumentasi dasar, dan konfigurasi pemeriksaan repository menjadi fondasi untuk pengembangan frontend, backend, autentikasi, serta integrasi database selanjutnya.
