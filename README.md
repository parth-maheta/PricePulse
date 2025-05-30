# PricePulse 📈

<div align="center">

![PricePulse Logo](https://img.shields.io/badge/PricePulse-Smart%20Price%20Tracker-blue?style=for-the-badge)

**Never miss a great deal again! Track Amazon product prices and get instant alerts when prices drop.**

[![Made with Node.js](https://img.shields.io/badge/Node.js-339933?style=flat&logo=nodedotjs&logoColor=white)](https://nodejs.org/)
[![React](https://img.shields.io/badge/React-20232A?style=flat&logo=react&logoColor=61DAFB)](https://reactjs.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=flat&logo=mongodb&logoColor=white)](https://mongodb.com/)
[![Express.js](https://img.shields.io/badge/Express.js-000000?style=flat&logo=express&logoColor=white)](https://expressjs.com/)

</div>

---

## 🚀 Introduction

PricePulse is a full-stack price monitoring application that automatically tracks Amazon product prices and sends alerts when your target price is reached. Built with modern web technologies, it features intelligent web scraping with anti-bot protection and real-time price tracking.

The application consists of a React.js frontend dashboard where users can manage their tracked products, and a Node.js backend that handles web scraping, data storage, and automated price monitoring through scheduled background jobs.

---

## 🌟 Features

- **🤖 Smart Web Scraping** - Automated Amazon price tracking using Playwright with Chromium
- **📱 Responsive Dashboard** - Clean, intuitive React.js interface for managing products
- **🔔 Real-time Alerts** - Get notified instantly when product prices drop below your target
- **📊 Price History Tracking** - Monitor price trends and historical data over time
- **⚡ Background Monitoring** - Automated scheduled jobs for continuous price checking
- **🛡️ Bot Protection Bypass** - Advanced anti-detection mechanisms for reliable scraping
- **📋 Product Management** - Add, update, and delete tracked products with ease
- **🎯 Target Price Setting** - Set custom price thresholds for each product
- **🔄 Automatic Updates** - Real-time price updates stored in database
- **📱 Cross-Platform** - Works on desktop, tablet, and mobile devices

---

## 🛠️ Tech Stack

### Frontend
- **React.js** - User interface framework for building interactive components
- **TailWind CSS** - Modern styling with responsive design principles
- **Axios** - HTTP client for making API requests to backend

### Backend
- **Node.js** - JavaScript runtime environment for server-side development
- **Express.js** - Fast, unopinionated web framework for Node.js
- **Playwright** - Modern web scraping framework with Chromium browser automation
- **Mongoose** - MongoDB object modeling library for Node.js
- **node-cron** - Task scheduling library for running background jobs

### Database
- **MongoDB** - NoSQL document database for storing products and alerts
- **MongoDB Atlas** - Cloud database service (optional)

### DevOps & Tools
- **dotenv** - Environment variables management
- **CORS** - Cross-origin resource sharing middleware
- **Chromium** - Headless browser for web scraping operations

---

## ⚡ Installation Guide

### Prerequisites
- Node.js (version 14 or higher)
- MongoDB (local installation or cloud instance)
- Git for version control

### Step 1: Clone Repository
```bash
git clone https://github.com/parth-maheta/PricePulse.git
cd PricePulse
```

### Step 2: Backend Setup
```bash
# Navigate to backend directory
cd backend

# Install backend dependencies
npm install

# Install Playwright browsers
npx playwright install chromium

# Create environment file
touch .env
```

Add the following to your `.env` file:
```env
MONGO_URI=mongodb://localhost:27017/pricepulse
PORT=5000
NODE_ENV=development
```

```bash
# Start backend server
npm start
```

### Step 3: Frontend Setup
```bash
# Open new terminal and navigate to frontend
cd frontend

# Install frontend dependencies
npm install

# Start development server
npm start
```

### Step 4: Access Application
- **Frontend Dashboard**: http://localhost:3000
- **Backend API**: http://localhost:5000
- **API Health Check**: http://localhost:5000/ (should show "PricePulse backend is running")

### Step 5: Verify Installation
1. Open http://localhost:3000 in your browser
2. Try adding an Amazon product URL
3. Check if the product appears in your dashboard
4. Verify that price scraping is working correctly

---

## 📈 Performance Features

### Efficient Web Scraping
- **Headless Browser Optimization** - Uses Chromium in headless mode for faster scraping
- **Smart Element Selection** - Multiple fallback selectors for reliable price extraction
- **Request Optimization** - Optimized page loading with network idle detection
- **Memory Management** - Proper browser instance cleanup to prevent memory leaks

### Anti-Bot Protection
- **User Agent Spoofing** - Mimics real browser signatures to avoid detection
- **Human-like Behavior** - Realistic viewport sizes and browsing patterns
- **Captcha Detection** - Automatic detection and handling of Amazon's bot protection
- **Error Recovery** - Graceful handling of blocked requests with retry mechanisms

### Database Performance
- **Efficient Queries** - Optimized MongoDB queries with proper indexing
- **Data Caching** - Strategic caching of frequently accessed product data
- **Batch Operations** - Bulk updates for multiple products during scheduled runs
- **Connection Pooling** - Optimized database connection management

### Background Processing
- **Scheduled Jobs** - Efficient cron-based scheduling for price monitoring
- **Parallel Processing** - Concurrent scraping of multiple products
- **Rate Limiting** - Respectful scraping intervals to avoid overwhelming servers
- **Queue Management** - Proper job queuing for large numbers of tracked products

### API Performance
- **RESTful Design** - Well-structured API endpoints for optimal data transfer
- **Response Optimization** - Minimal payload sizes with only necessary data
- **Error Handling** - Comprehensive error responses with proper HTTP status codes
- **CORS Configuration** - Optimized cross-origin resource sharing settings

---


---

## 👨‍💻 Author

**Parth Maheta**

- **GitHub**: [@parth-maheta](https://github.com/parth-maheta)
- **LinkedIn**: [Connect with me](www.linkedin.com/in/parthmaheta12)
- **Email**: parthmaheta.1012@gmail.com


### About the Developer
Full-stack developer passionate about building practical solutions that solve real-world problems. Specialized in modern web technologies including React, Node.js, and automated web scraping solutions.

---

<div align="center">

**⭐ Star this repository if you found it helpful!**

*Built with ❤️ and lots of ☕*

**PricePulse - Smart Price Tracking Made Simple**

</div>