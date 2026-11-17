# Spesifikasi API

## Proyek

TIF2001 Odette Medication Reminder

## Alamat Dasar API

`http://localhost:5000/api/v1`

## Autentikasi Pengguna

### Pendaftaran Akun

- Metode: POST
- Alamat: `/auth/register`
- Keterangan: Mendaftarkan pengguna baru.

### Masuk ke Akun

- Metode: POST
- Alamat: `/auth/login`
- Keterangan: Memeriksa identitas pengguna dan mengembalikan token JWT jika berhasil.

## Data Obat

### Melihat Daftar Obat

- Metode: GET
- Alamat: `/medications`
- Keterangan: Mengambil daftar obat milik pengguna yang sudah terautentikasi.

### Menambahkan Obat

- Metode: POST
- Alamat: `/medications`
- Keterangan: Menambahkan data obat baru.

### Mengubah Data Obat

- Metode: PUT
- Alamat: `/medications/:id`
- Keterangan: Mengubah informasi obat berdasarkan ID.

### Menghapus Data Obat

- Metode: DELETE
- Alamat: `/medications/:id`
- Keterangan: Menghapus data obat berdasarkan ID.

## Jadwal Pengingat

### Melihat Daftar Pengingat

- Metode: GET
- Alamat: `/reminders`
- Keterangan: Mengambil daftar pengingat milik pengguna yang sudah terautentikasi.

### Menambahkan Pengingat

- Metode: POST
- Alamat: `/reminders`
- Keterangan: Membuat jadwal pengingat konsumsi obat.

### Mengubah Pengingat

- Metode: PUT
- Alamat: `/reminders/:id`
- Keterangan: Mengubah jadwal pengingat berdasarkan ID.

### Menghapus Pengingat

- Metode: DELETE
- Alamat: `/reminders/:id`
- Keterangan: Menghapus jadwal pengingat berdasarkan ID.

Catatan: Dokumen ini menjelaskan rancangan API. Ketersediaan setiap alamat perlu dicocokkan dengan implementasi backend.
