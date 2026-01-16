import bcrypt from "bcrypt";
import pool from "../db/index.js";

export const login = async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ error: "Missing credentials" });
  }

  const result = await pool.query(
    "SELECT * FROM admins WHERE username = $1",
    [username]
  );

  const admin = result.rows[0];
  if (!admin) {
    return res.status(401).json({ error: "Invalid credentials" });
  }

  const isMatch = await bcrypt.compare(password, admin.password_hash);
  if (!isMatch) {
    return res.status(401).json({ error: "Invalid credentials" });
  }

  req.session.adminId = admin.id;
  res.json({ message: "Login successful" });
};

export const logout = (req, res) => {
  req.session.destroy(() => {
    res.clearCookie("booknotes.sid");
    res.json({ message: "Logged out" });
  });
};

export const me = (req, res) => {
  if (!req.session.adminId) {
    return res.status(401).json({ authenticated: false });
  }

  res.json({ authenticated: true });
};
