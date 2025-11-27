import express from "express";
import { pool } from "../utils/db.js";

const router = express.Router();

router.get("/", async (req, res) => {
  const [rows] = await pool.query("SELECT doctor_id, name, specialty FROM doctors");
  res.json(rows);
});

export default router;
