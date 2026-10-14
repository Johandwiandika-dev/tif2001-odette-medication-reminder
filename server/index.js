const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Secret Key JWT (sebaiknya diambil dari .env)
const JWT_SECRET = process.env.JWT_SECRET || 'rahasia_super_aman';

// ==========================================
// ENDPOINT REGISTER
// ==========================================
app.post('/api/auth/register', async (req, res) => {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return res.status(400).json({ status: 'error', message: 'Semua kolom wajib diisi!' });
    }

    // Cek apakah email sudah terdaftar
    const userExists = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
    if (userExists.rows.length > 0) {
      return res.status(400).json({ status: 'error', message: 'Email sudah terdaftar!' });
    }

    // Hash password dengan bcrypt
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Simpan user ke database
    const newUser = await pool.query(
      'INSERT INTO users (username, email, password) VALUES ($1, $2, $3) RETURNING id, username, email, created_at',
      [username, email, hashedPassword]
    );

    res.status(201).json({
      status: 'success',
      message: 'Registrasi berhasil!',
      data: newUser.rows[0]
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ status: 'error', message: 'Terjadi kesalahan pada server' });
  }
});

// ==========================================
// ENDPOINT LOGIN
// ==========================================
app.post('/api/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ status: 'error', message: 'Email dan password wajib diisi!' });
    }

    // Cari user berdasarkan email
    const user = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
    if (user.rows.length === 0) {
      return res.status(401).json({ status: 'error', message: 'Email atau password salah!' });
    }

    // Verifikasi password
    const validPassword = await bcrypt.compare(password, user.rows[0].password);
    if (!validPassword) {
      return res.status(401).json({ status: 'error', message: 'Email atau password salah!' });
    }

    // Buat token JWT
    const token = jwt.sign(
      { id: user.rows[0].id, email: user.rows[0].email },
      JWT_SECRET,
      { expiresIn: '1d' }
    );

    res.status(200).json({
      status: 'success',
      message: 'Login berhasil!',
      token: token,
      user: {
        id: user.rows[0].id,
        username: user.rows[0].username,
        email: user.rows[0].email
      }
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ status: 'error', message: 'Terjadi kesalahan pada server' });
  }
});