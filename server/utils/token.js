const crypto = require('node:crypto');

function getSecret() {
  const secret = process.env.JWT_SECRET;
  if (!secret || secret.length < 32) {
    throw new Error('JWT_SECRET wajib diisi dengan nilai acak minimal 32 karakter.');
  }
  return secret;
}

function createToken(payload, expiresInSeconds = 60 * 60 * 24) {
  const header = Buffer.from(JSON.stringify({ alg: 'HS256', typ: 'JWT' })).toString('base64url');
  const now = Math.floor(Date.now() / 1000);
  const body = Buffer.from(JSON.stringify({ ...payload, iat: now, exp: now + expiresInSeconds })).toString('base64url');
  const input = header + '.' + body;
  const signature = crypto.createHmac('sha256', getSecret()).update(input).digest('base64url');
  return input + '.' + signature;
}

function verifyToken(token) {
  const parts = String(token || '').split('.');
  if (parts.length !== 3) throw new Error('Token tidak valid.');
  const input = parts[0] + '.' + parts[1];
  const expected = crypto.createHmac('sha256', getSecret()).update(input).digest();
  const actual = Buffer.from(parts[2], 'base64url');
  if (actual.length !== expected.length || !crypto.timingSafeEqual(actual, expected)) {
    throw new Error('Tanda tangan token tidak valid.');
  }
  const payload = JSON.parse(Buffer.from(parts[1], 'base64url').toString('utf8'));
  if (!payload.exp || payload.exp <= Math.floor(Date.now() / 1000)) throw new Error('Token sudah kedaluwarsa.');
  return payload;
}

module.exports = { createToken, verifyToken };
