Temperature Monitoring System

Overview

The Temperature Monitoring System is an IoT-based project designed to measure and track temperature in real-time. It utilizes a microcontroller, temperature sensor, and a web-based interface built with Node.js, Express.js, and React.js to display temperature readings and generate alerts when temperature thresholds are exceeded.

Features

Real-time Temperature Monitoring: Continuously measures and displays temperature values.

Data Logging: Stores temperature readings for analysis.

Web Dashboard: Provides a user-friendly interface to visualize data.

Alert System: Sends notifications when temperature exceeds predefined thresholds.

MQTT Communication: Uses MQTT protocol for efficient sensor data transmission.

Technologies Used

Backend:

Node.js

Express.js


Frontend:

React.js

Chart.js

Reactstrap

Hardware:

Microcontroller (e.g., ESP32, Raspberry Pi)

Temperature Sensor (e.g., DHT11, DHT22)

Installation & Setup

Prerequisites

Install Node.js and npm.

Install MQTT broker (e.g., Mosquitto) if running locally.

Steps

Clone the repository:

git clone https://github.com/NadaBargougui/TemperatureMonitoring.git
cd TemperatureMonitoring

Install backend dependencies and start the server:

cd backend
npm install
node server.js

Install frontend dependencies and start the React dashboard:

cd frontend
npm install
npm start

Access the dashboard via http://localhost:3000.

Usage

Power on the microcontroller.

Navigate to the web dashboard to view real-time temperature data.

Set threshold limits to receive alerts when temperature exceeds limits.


Contact

For any inquiries, reach out to Nada Bargougui via GitHub or email.
