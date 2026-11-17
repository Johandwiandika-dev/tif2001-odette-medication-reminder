const test = require('node:test');
const assert = require('node:assert/strict');
const { createToken, verifyToken } = require('./token');

process.env.JWT_SECRET = 'test-secret-that-is-long-enough-for-unit-tests-123';

test('token yang sah dapat diverifikasi', () => {
  const token = createToken({ sub: 7, email: 'uji@example.com' });
  const payload = verifyToken(token);
  assert.equal(payload.sub, 7);
  assert.equal(payload.email, 'uji@example.com');
});

test('token yang telah diubah ditolak', () => {
  const token = createToken({ sub: 7 });
  const changed = token.slice(0, -1) + (token.endsWith('a') ? 'b' : 'a');
  assert.throws(() => verifyToken(changed));
});

test('token kedaluwarsa ditolak', () => {
  const token = createToken({ sub: 7 }, -1);
  assert.throws(() => verifyToken(token), /kedaluwarsa/);
});
