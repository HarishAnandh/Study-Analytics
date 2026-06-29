# 📚 Snippa – Study Analytics & Smart Timetable Generator

## Overview

Snippa is a full-stack web application designed to help students manage their studies more effectively. It allows users to track subjects, analyze study priorities, visualize learning progress, generate study timetables, and manage their accounts through secure authentication.

The application combines a modern React frontend with a FastAPI backend and PostgreSQL database hosted on Supabase.

---

# ✨ Features

## User Authentication

* User Registration
* User Login
* Secure Password Authentication
* User Profile Management
* Logout Functionality
* Supabase Authentication Integration

## Subject Management

* Add Subjects
* View Subjects
* Delete Subjects
* Difficulty Tracking
* Knowledge/Proficiency Tracking
* Automatic Priority Calculation

## Analytics Dashboard

* Total Subjects
* Average Difficulty
* Average Knowledge
* Highest Priority Subject
* Interactive Charts
* Progress Visualization

## Timetable Generator

* Custom Start Time
* Custom End Time
* Priority-Based Scheduling
* Automated Time Distribution
* PDF Timetable Export

## User Profile

* Username Display
* Account Information
* Logout Access

---

# 🏗️ System Architecture

```text
Frontend (React + Vite)
        │
        ▼
 FastAPI Backend
        │
        ▼
 PostgreSQL Database
   (Supabase)
```

---

# 🛠 Technology Stack

## Frontend

* React.js
* Vite
* Axios
* React Router DOM
* React Icons
* Recharts
* jsPDF

## Backend

* FastAPI
* SQLAlchemy
* Uvicorn

## Database

* PostgreSQL
* Supabase

## Authentication

* Supabase Auth

## Deployment

Frontend:

* Vercel

Backend:

* Render

---

# 📂 Project Structure

```text
StudyAnalytics
│
├── frontend
│   │
│   ├── public
│   │
│   ├── src
│   │   │
│   │   ├── assets
│   │   │   ├── hero.png
│   │   │   ├── react.svg
│   │   │   └── vite.svg
│   │   │
│   │   ├── components
│   │   │   ├── Navbar.jsx
│   │   │   └── SubjectChart.jsx
│   │   │
│   │   ├── pages
│   │   │   ├── Login.jsx
│   │   │   ├── Subjects.jsx
│   │   │   ├── Dashboard.jsx
│   │   │   └── Profile.jsx
│   │   │
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   ├── supabase.js
│   │   ├── App.css
│   │   └── index.css
│   │
│   ├── package.json
│   ├── vite.config.js
│   └── vercel.json
│
└── backend
    │
    ├── main.py
    ├── database.py
    ├── models.py
    ├── requirements.txt
    └── .env
```

---

# 🚀 Installation Guide

## Prerequisites

Install the following:

### Node.js

Download:

https://nodejs.org

Verify installation:

```bash
node -v
npm -v
```

### Python

Download:

https://python.org

Verify:

```bash
python --version
```

### Git

Download:

https://git-scm.com

Verify:

```bash
git --version
```

---

# 📥 Clone Repository

```bash
git clone https://github.com/<your-username>/StudyAnalytics.git
```

```bash
cd StudyAnalytics
```

---

# Frontend Setup

Navigate to frontend:

```bash
cd frontend
```

Install dependencies:

```bash
npm install
```

Install additional packages:

```bash
npm install axios
```

```bash
npm install react-icons
```

```bash
npm install react-router-dom
```

```bash
npm install jspdf
```

```bash
npm install recharts
```

```bash
npm install @supabase/supabase-js
```

Run frontend:

```bash
npm run dev
```

Application will start at:

```text
http://localhost:5173
```

---

# Backend Setup

Navigate to backend:

```bash
cd backend
```

Create virtual environment:

### Windows

```bash
python -m venv venv
```

```bash
venv\Scripts\activate
```

### Mac/Linux

```bash
python3 -m venv venv
```

```bash
source venv/bin/activate
```

Install dependencies:

```bash
pip install fastapi
```

```bash
pip install uvicorn
```

```bash
pip install sqlalchemy
```

```bash
pip install psycopg2-binary
```

Generate requirements file:

```bash
pip freeze > requirements.txt
```

Run backend:

```bash
uvicorn main:app --reload
```

Backend URL:

```text
http://127.0.0.1:8000
```

Swagger Documentation:

```text
http://127.0.0.1:8000/docs
```

---

# 🗄 Database Setup (Supabase)

## Create Project

Visit:

https://supabase.com

Create a new project.

---

## Create Database Table

```sql
CREATE TABLE subjects (
    id BIGSERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    difficulty INTEGER,
    proficiency INTEGER,
    priority INTEGER
);
```

---

## Get Database URL

Supabase Dashboard:

Settings → Database

Copy:

```text
Connection String
```

Example:

```text
postgresql://postgres:password@host:5432/postgres
```

---

## Configure Backend

Create:

```text
backend/.env
```

```env
DATABASE_URL=your_database_url
```

---

# 🔐 Authentication Setup

## Create Supabase Auth Project

Dashboard:

Authentication → Providers

Enable:

```text
Email Provider
```

---

## Get Credentials

Dashboard:

Settings → API

Copy:

```text
Project URL
Anon Key
```

---

## Configure Frontend

File:

```text
src/supabase.js
```

```javascript
import { createClient } from "@supabase/supabase-js";

const supabaseUrl =
  "YOUR_PROJECT_URL";

const supabaseKey =
  "YOUR_ANON_KEY";

const supabase = createClient(
  supabaseUrl,
  supabaseKey
);

export default supabase;
```

---

# 📡 API Endpoints

## Home

```http
GET /
```

Response:

```json
{
  "message": "Study Analytics API Running"
}
```

---

## Get Subjects

```http
GET /subjects
```

Response:

```json
[
  {
    "id": 1,
    "name": "Physics",
    "difficulty": 8,
    "proficiency": 40,
    "priority": 480
  }
]
```

---

## Add Subject

```http
POST /subjects
```

Request:

```json
{
  "name": "Physics",
  "difficulty": 8,
  "proficiency": 40,
  "priority": 480
}
```

---

## Delete Subject

```http
DELETE /subjects/{id}
```

Example:

```http
DELETE /subjects/5
```

---

# 🧮 Priority Calculation

Formula:

```text
Priority =
Difficulty × (100 − Proficiency)
```

Example:

```text
Difficulty = 8

Knowledge = 40%

Priority =
8 × (100 - 40)

Priority = 480
```

Higher value indicates greater study importance.

---

# 📄 Timetable Generation Logic

The timetable generator:

1. Takes Start Time
2. Takes End Time
3. Calculates Available Hours
4. Sorts Subjects by Priority
5. Allocates More Time to High-Priority Subjects
6. Generates Study Schedule
7. Exports Schedule as PDF

---

# ☁ Deployment

# Frontend (Vercel)

Install:

```bash
npm install -g vercel
```

Deploy:

```bash
vercel
```

---

## Important

Create:

```text
frontend/vercel.json
```

```json
{
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ]
}
```

This prevents React Router 404 errors.

---

# Backend (Render)

Create:

New Web Service

Build Command:

```bash
pip install -r requirements.txt
```

Start Command:

```bash
uvicorn main:app --host 0.0.0.0 --port 10000
```

Add Environment Variable:

```text
DATABASE_URL
```

Deploy.

---

# 🧪 Testing

Backend:

```bash
python -m py_compile main.py
```

```bash
uvicorn main:app --reload
```

Frontend:

```bash
npm run dev
```

---

# Future Enhancements

* AI Study Recommendations
* Pomodoro Timer
* Attendance Tracker
* Exam Countdown
* Subject Editing
* Study Streaks
* Cloud Notes
* Mobile Application
* Dark/Light Themes
* Weekly Planner
* Calendar Integration

---

# 👨‍💻 Author

**Harish Anandh**

Information Technology Department

Anna University

Built for students, by a student.

---

# License

This project is licensed under the MIT License.
