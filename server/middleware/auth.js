const { verifyToken } = require('../utils/token');

function requireAuth(req, res, next) {
  const authorization = req.headers.authorization || '';
  const [scheme, token] = authorization.split(' ');
  if (scheme !== 'Bearer' || !token) {
    return res.status(401).json({ message: 'Silakan masuk untuk melanjutkan.' });
  }

  try {
    const payload = verifyToken(token);
    req.user = { id: Number(payload.sub), email: payload.email };
    if (!Number.isInteger(req.user.id) || req.user.id <= 0) throw new Error('ID pengguna tidak valid.');
    return next();
  } catch {
    return res.status(401).json({ message: 'Sesi tidak valid atau sudah kedaluwarsa. Silakan masuk kembali.' });
  }
}

module.exports = requireAuth;
