# 🚗 Car Sales Dashboard

A full-stack web application to manage and visualize car sales records. Built with **React (Vite)**, **Tailwind CSS**, **shadcn/ui**, **Node.js (Express)**, and **MySQL**.

---

## 📌 Features

### Frontend
- View paginated list of car sales (client-side & server-side modes)
- Add/Edit car sale entries
- Optional receipt image upload (via Multer)
- Search and filter car data
- Summary dashboard with:
  - Pie charts and tables for company-wise and fuel-type-wise sales
  - Total revenue, sales count, etc.

### Backend
- RESTful API with CRUD operations for car records
- MySQL database for data persistence
- Multer for image upload handling
- API routes for generating aggregate sales statistics

---

## 🛠 Tech Stack

| Layer     | Tech                     |
|-----------|--------------------------|
| Frontend  | React, Vite, Tailwind CSS, shadcn/ui |
| Backend   | Node.js, Express         |
| Database  | MySQL                    |
| Charts    | ECharts (via `echarts-for-react`) |
| Uploads   | Multer                   |

---

## 🚀 Setup Instructions

Prerequisites

* Node.js (v16 or higher)
* MySQL (v8.0 or higher)
* Git

### 1. Clone the repository

```bash
git clone https://github.com/anwita-das/car-sales-record.git
cd car-sales-record
```
### 2. Install dependencies

```bash
npm install
```
### 3. Database Setup

* Create a MySQL database:

```sql
CREATE DATABASE car_sales_db;
```
* IMPORTANT: Create a .env file in the backend directory with your database credentials.
* Update your pool.js file to use environment variables instead of hardcoded credentials.
* Add .env to your .gitignore file.

### 4. Start the Application

Development Mode:
```bash
# Terminal 1: Start the backend server
cd backend
nodemon server.js

# Terminal 2: Start the frontend (in root directory)
npm run dev
```

Production Mode
```bash
# Build the frontend
npm run build

# Start backend production server
cd backend
node server.js
```

🙏 Acknowledgments

* shadcn/ui for the beautiful UI components
* ECharts for powerful data visualization
* Tailwind CSS for utility-first styling
