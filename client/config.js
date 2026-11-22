/* Konfigurasi API: lokal menggunakan server localhost, deployment menggunakan same-origin Vercel. */
const odetteIsLocal = ['localhost', '127.0.0.1'].includes(window.location.hostname);
window.ODETTE_API_BASE_URL = odetteIsLocal
  ? 'http://localhost:5000/api/v1'
  : '/api/v1';
