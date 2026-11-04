function validateEmail(email) {
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailPattern.test(String(email).trim());
}

function validateRegistration({
  name,
  email,
  password,
  confirmPassword,
  users = [],
}) {
  if (!name || !name.trim()) {
    return { valid: false, message: "Nama wajib diisi." };
  }

  if (!validateEmail(email)) {
    return { valid: false, message: "Format email tidak valid." };
  }

  if (!password || password.length < 6) {
    return { valid: false, message: "Password minimal 6 karakter." };
  }

  if (password !== confirmPassword) {
    return { valid: false, message: "Konfirmasi password tidak cocok." };
  }

  const emailExists = users.some(
    (user) => user.email.toLowerCase() === email.trim().toLowerCase(),
  );

  if (emailExists) {
    return { valid: false, message: "Email sudah terdaftar." };
  }

  return { valid: true, message: "Registrasi valid." };
}

function validateLogin({ email, password, users = [] }) {
  if (!validateEmail(email)) {
    return { valid: false, message: "Format email tidak valid." };
  }

  if (!password) {
    return { valid: false, message: "Password wajib diisi." };
  }

  const user = users.find(
    (item) =>
      item.email.toLowerCase() === email.trim().toLowerCase() &&
      item.password === password,
  );

  if (!user) {
    return { valid: false, message: "Email atau password salah." };
  }

  return { valid: true, message: "Login berhasil.", user };
}

if (typeof module !== "undefined" && module.exports) {
  module.exports = {
    validateEmail,
    validateRegistration,
    validateLogin,
  };
}

if (typeof window !== "undefined") {
  window.MediCareValidation = {
    validateEmail,
    validateRegistration,
    validateLogin,
  };
}
