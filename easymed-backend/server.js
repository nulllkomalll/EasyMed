const express = require('express');
const mysql = require('mysql2');
const bcrypt = require('bcryptjs');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Serve frontend static files
app.use(express.static(path.join(__dirname, '../easymed-frontend')));

// MySQL Connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',              // Your MySQL username
    password: 'rememberme',    // Your MySQL password
    database: 'easymed'        // Database name
});

db.connect((err) => {
    if (err) throw err;
    console.log("MySQL Connected!");
});

// ---------------- API ROUTES -----------------

// Register Patient
app.post('/register', async (req, res) => {
    const { name, email, phone, password } = req.body;

    const hash = await bcrypt.hash(password, 10);
    const sql = "INSERT INTO patients (name, email, phone, password_hash) VALUES (?, ?, ?, ?)";

    db.query(sql, [name, email, phone, hash], (err) => {
        if (err) return res.status(500).json({ error: err });
        res.json({ message: "Patient Registered Successfully!" });
    });
});

// Patient Login
app.post('/login', (req, res) => {
    const { email, password } = req.body;

    const sql = "SELECT * FROM patients WHERE email = ?";
    db.query(sql, [email], async (err, results) => {
        if(err) return res.status(500).json({ error: err });
        if(results.length === 0) return res.json({ success: false, message: "Email not found" });

        const match = await bcrypt.compare(password, results[0].password_hash);
        if(match){
            res.json({ success: true, message: "Login Successful" });
        } else {
            res.json({ success: false, message: "Incorrect Password" });
        }
    });
});

// Get all appointments
app.get('/appointments', (req, res) => {
    const sql = `
        SELECT a.appointment_id, p.name AS patient, d.name AS doctor, 
               appointment_date, appointment_time, status 
        FROM appointments a
        JOIN patients p ON a.patient_id = p.patient_id
        JOIN doctors d ON a.doctor_id = d.doctor_id`;

    db.query(sql, (err, results) => {
        if (err) return res.status(500).json({ error: err });
        res.json(results);
    });
});

// Default route → registration page
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../easymed-frontend/registration.html'));
});

// Start Server
app.listen(5000, () => {
    console.log("Server running on port 5000");
});


// Book Appointment
app.post('/appointments/book', (req, res) => {
    const { patient_id, doctor_id, appointment_date, appointment_time } = req.body;
    const sql = "INSERT INTO appointments (patient_id, doctor_id, appointment_date, appointment_time) VALUES (?, ?, ?, ?)";
    db.query(sql, [patient_id, doctor_id, appointment_date, appointment_time], (err) => {
        if(err) return res.status(500).json({ success: false, message: err });
        res.json({ success: true, message: "Appointment booked successfully" });
    });
});
