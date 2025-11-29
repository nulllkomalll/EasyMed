CREATE DATABASE easymed;
USE easymed;

CREATE TABLE patients (
  patient_id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(200) UNIQUE NOT NULL,
  phone VARCHAR(20),
  password_hash VARCHAR(255) NOT NULL
);

CREATE TABLE doctors (
  doctor_id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(200) UNIQUE NOT NULL,
  specialty VARCHAR(100),
  password_hash VARCHAR(255) NOT NULL
);

CREATE TABLE appointments (
  appointment_id INT AUTO_INCREMENT PRIMARY KEY,
  patient_id INT,
  doctor_id INT,
  appointment_date DATE,
  appointment_time TIME,
  status ENUM('Booked','Completed','Cancelled') DEFAULT 'Booked',
  FOREIGN KEY (patient_id) REFERENCES patients(patient_id),
  FOREIGN KEY (doctor_id) REFERENCES doctors(doctor_id)
);

-- Insert Patients
INSERT INTO patients (name, email, phone, password_hash) VALUES
('Komal ', 'komal@example.com', '9876543210', 'dummyhash123'),
('Rohit Sharma', 'rohit@example.com', '9123456780', 'dummyhash456');

-- Insert Doctors
INSERT INTO doctors (name, email, specialty, password_hash) VALUES
('Dr. Aditi Patil', 'aditi.derma@example.com', 'Dermatologist', 'dummyhash789'),
('Dr. Rahul Deshmukh', 'rahul.cardio@example.com', 'Cardiologist', 'dummyhash987');

-- Insert Appointments
INSERT INTO appointments (patient_id, doctor_id, appointment_date, appointment_time, status) VALUES
(1, 1, '2025-12-01', '10:30:00', 'Booked'),
(2, 2, '2025-12-02', '14:00:00', 'Booked');patientspatientsappointments


