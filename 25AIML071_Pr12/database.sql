CREATE DATABASE IF NOT EXISTS studenthub CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE studenthub;

CREATE TABLE IF NOT EXISTS admins (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(190) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS events (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(180) NOT NULL,
    description TEXT NOT NULL,
    event_date DATE NOT NULL,
    venue VARCHAR(180) NOT NULL,
    category VARCHAR(60) NOT NULL,
    status ENUM('Open','Closed') NOT NULL DEFAULT 'Open',
    poster VARCHAR(255) DEFAULT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

INSERT INTO events (title, description, event_date, venue, category, status)
VALUES
('AI and Machine Learning Workshop','Learn the fundamentals of artificial intelligence and machine learning.','2026-11-15','Seminar Hall','Workshop','Open'),
('Student Innovation Competition','Present innovative technology-based ideas.','2026-11-22','Main Auditorium','Technical','Open'),
('Campus Coding Challenge','Test programming and problem-solving skills.','2026-12-05','Computer Lab 1','Technical','Closed');
