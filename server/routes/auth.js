import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { pool } from "../utils/db.js";

const router = express.Router();

// Patient Signup
router.post("/signup", async (req, res) => {
  const { name, email, password, phone } = req.body;
  const hash = await bcrypt.hash(password, 10);
  await pool.query(
    `INSERT INTO patients (name, email, phone, password_hash) VALUES (?,?,?,?)`,
    [name, email, phone, hash]
  );
  res.json({ msg: "User Registered" });
});

// Login for both patient & doctor
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const [[user]] = await pool.query(
    `SELECT patient_id AS id, password_hash, 'patient' as role FROM patients WHERE email=?
     UNION
     SELECT doctor_id AS id, password_hash, 'doctor' as role FROM doctors WHERE email=?`,
    [email, email]
  );
  
  if (!user) return res.status(404).json({ msg: "Invalid User" });
  const match = await bcrypt.compare(password, user.password_hash);
  if (!match) return res.status(403).json({ msg: "Invalid Password" });

  const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET);
  res.json({ token, role: user.role });
});

export default router;
