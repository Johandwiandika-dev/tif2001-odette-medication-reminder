const {
  validateEmail,
  validateRegistration,
  validateLogin,
} = require("./validation");

describe("Validasi Email", () => {
  test("email dengan format benar diterima", () => {
    expect(validateEmail("cia@gmail.com")).toBe(true);
  });

  test("email tanpa format benar ditolak", () => {
    expect(validateEmail("ciagmail.com")).toBe(false);
  });
});

describe("Validasi Registrasi", () => {
  const validData = {
    name: "Citra",
    email: "citra@gmail.com",
    password: "rahasia123",
    confirmPassword: "rahasia123",
    users: [],
  };

  test("registrasi dengan data valid berhasil", () => {
    expect(validateRegistration(validData).valid).toBe(true);
  });

  test("nama kosong ditolak", () => {
    expect(validateRegistration({ ...validData, name: "" }).valid).toBe(false);
  });

  test("email tidak valid ditolak", () => {
    expect(validateRegistration({ ...validData, email: "citra" }).valid).toBe(
      false,
    );
  });

  test("password kurang dari 6 karakter ditolak", () => {
    expect(
      validateRegistration({
        ...validData,
        password: "123",
        confirmPassword: "123",
      }).valid,
    ).toBe(false);
  });

  test("konfirmasi password berbeda ditolak", () => {
    expect(
      validateRegistration({
        ...validData,
        confirmPassword: "berbeda123",
      }).valid,
    ).toBe(false);
  });

  test("email yang sudah terdaftar ditolak", () => {
    expect(
      validateRegistration({
        ...validData,
        users: [{ email: "citra@gmail.com" }],
      }).valid,
    ).toBe(false);
  });
});

describe("Validasi Login", () => {
  const users = [
    { name: "Citra", email: "citra@gmail.com", password: "rahasia123" },
  ];

  test("login dengan data benar berhasil", () => {
    expect(
      validateLogin({
        email: "citra@gmail.com",
        password: "rahasia123",
        users,
      }).valid,
    ).toBe(true);
  });

  test("login dengan password salah ditolak", () => {
    expect(
      validateLogin({
        email: "citra@gmail.com",
        password: "salah123",
        users,
      }).valid,
    ).toBe(false);
  });

  test("login dengan email tidak terdaftar ditolak", () => {
    expect(
      validateLogin({
        email: "lain@gmail.com",
        password: "rahasia123",
        users,
      }).valid,
    ).toBe(false);
  });
});
