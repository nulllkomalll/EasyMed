import express from "express";
import { pool } from "../utils/db.js";
import { auth } from "../middleware/auth.js";

const router = express.Router();

router.post("/book", auth, async (req, res) => {
  const { doctor_id, appointment_date, appointment_time } = req.body;
  await pool.query(
    `INSERT INTO appointments (patient_id, doctor_id, appointment_date, appointment_time)
     VALUES (?,?,?,?)`,
    [req.user.id, doctor_id, appointment_date, appointment_time]
  );
  res.json({ msg: "Appointment Booked" });
});

router.get("/mine", auth, async (req, res) => {
  const [rows] = await pool.query(
    `SELECT a.*, d.name as doctor_name FROM appointments a
     JOIN doctors d ON a.doctor_id = d.doctor_id
     WHERE a.patient_id = ?`,
     [req.user.id]
  );
  res.json(rows);
});

export default router;
