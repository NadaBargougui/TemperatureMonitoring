# 🌡️ Temperature Monitoring System

📌 Overview

The Temperature Monitoring System is an advanced IoT-based solution designed to measure and track temperature in real-time. It utilizes an ESP32 microcontroller with a DHT22 temperature sensor to collect data, while a Raspberry Pi hosts the Mosquitto MQTT broker for efficient communication. A modern web application built with Node.js, Express.js, and React.js provides a user-friendly interface for data visualization and real-time email alerts when temperature thresholds are exceeded.

🚀 Features

✅ Real-time Monitoring: Continuously measures and displays temperature values 

✅ Data Logging: Stores temperature readings for historical analysis 

✅ Web Dashboard: Interactive UI for monitoring temperature trends 

✅ Alert System: Sends email notifications when temperature crosses predefined limits 

✅ MQTT Communication: Uses ESP32 to publish data to a Raspberry Pi-hosted Mosquitto broker 


🛠️ Technologies Used

Hardware

ESP32 (Microcontroller)

DHT22 (Temperature & Humidity Sensor)

Raspberry Pi (Hosting MQTT Broker with Mosquitto)

Software

🔷 Node.js & Express.js (Backend API)

🔷 React.js (Frontend UI)

🔷 Chart.js (Data Visualization)


🏗️ Installation & Setup

Prerequisites

Install Node.js and npm 

Set up Mosquitto MQTT broker on Raspberry Pi 


Steps to Run the Project

# 1️⃣ Clone the repository
`git clone https://github.com/NadaBargougui/TemperatureMonitoring.git`

`cd TemperatureMonitoring`

# 2️⃣ Backend Setup
$ cd back

$ npm install

$ node server.js

# 3️⃣ Frontend Setup
$ cd front

$ npm install

$ npm start

💡 Ensure your Raspberry Pi is running the Mosquitto broker, and the ESP32 is publishing temperature data.

🔗 Access the Web Dashboard: http://localhost:3000


🎯 Usage Guide

1️⃣ Power on the ESP32 microcontroller 

2️⃣ Navigate to the web dashboard to view real-time temperature data 

3️⃣ Set threshold limits to receive email alerts when temperature exceeds safe limits 


📞 Contact

For any inquiries, feel free to reach out to Nada Bargougui via GitHub or email.
