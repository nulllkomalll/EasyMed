import express from "express";
import cors from "cors";
import authRoutes from "./routes/auth.js";
import doctorRoutes from "./routes/doctors.js";
import appointmentRoutes from "./routes/appointments.js";

const app = express();
app.use(cors());
app.use(express.json());

app.use("/auth", authRoutes);
app.use("/doctors", doctorRoutes);
app.use("/appointments", appointmentRoutes);

app.listen(5000, () => console.log("Server running on port 5000"));
