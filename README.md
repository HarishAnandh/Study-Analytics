# 📚 Study Analytics Dashboard

A full-stack web application that helps students analyze and prioritize subjects based on difficulty and current proficiency levels.

## 🚀 Features

* Add and manage study subjects
* Calculate subject priority automatically
* Store data in Supabase PostgreSQL
* FastAPI backend with REST APIs
* React frontend dashboard
* Modern analytics-style UI
* Cloud deployment using Render
* GitHub version control

---

## 🏗️ Tech Stack

### Frontend

* React
* Vite
* Axios
* React Icons

### Backend

* FastAPI
* SQLAlchemy
* Psycopg2

### Database

* Supabase PostgreSQL

### Deployment

* Render (Backend)
* Vercel (Frontend)

---

## 📂 Project Structure

StudyAnalytics/

├── backend/

│   ├── main.py

│   ├── database.py

│   ├── models.py

│   ├── requirements.txt

│   └── .env

│

├── frontend/

│   ├── src/

│   │   ├── pages/

│   │   │   └── Subjects.jsx

│   │   ├── App.jsx

│   │   ├── main.jsx

│   │   └── index.css

│   ├── package.json

│   └── vite.config.js

│

└── README.md

---

## ⚙️ Installation

### Clone Repository

```bash
git clone https://github.com/HarishAnandh/Study-Analytics.git

cd Study-Analytics
```

---

## Backend Setup

Navigate to backend:

```bash
cd backend
```

Create virtual environment:

```bash
python -m venv venv
```

Activate virtual environment:

### Mac/Linux

```bash
source venv/bin/activate
```

### Windows

```bash
venv\Scripts\activate
```

Install dependencies:

```bash
pip install -r requirements.txt
```

---

## Environment Variables

Create a `.env` file:

```env
DATABASE_URL=postgresql://postgres:PASSWORD@HOST:5432/postgres
```

Example:

```env
DATABASE_URL=postgresql://postgres:M%40password@db.xxxxx.supabase.co:5432/postgres
```

---

## Run Backend

```bash
uvicorn main:app --reload
```

Backend runs on:

```text
http://127.0.0.1:8000
```

Swagger API Docs:

```text
http://127.0.0.1:8000/docs
```

---

## Frontend Setup

Navigate to frontend:

```bash
cd frontend
```

Install packages:

```bash
npm install
```

Install additional dependencies:

```bash
npm install axios
npm install react-icons
```

Run development server:

```bash
npm run dev
```

Frontend runs on:

```text
http://localhost:5173
```

---

## API Endpoints

### Get All Subjects

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

### Add Subject

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

## Priority Formula

Priority is calculated as:

```text
Priority = Difficulty × (100 - Proficiency)
```

Example:

```text
Difficulty = 8
Proficiency = 40

Priority = 8 × (100 - 40)

Priority = 480
```

Higher priority subjects require more attention.

---

## Git Commands Used

### Initialize Repository

```bash
git init
```

### Check Status

```bash
git status
```

### Add Files

```bash
git add .
```

### Commit Changes

```bash
git commit -m "Commit Message"
```

### View Commit History

```bash
git log --oneline
```

### Push Changes

```bash
git push origin main
```

### Pull Latest Changes

```bash
git pull origin main
```

---

## Deployment

### Backend Deployment (Render)

Build Command:

```bash
pip install -r requirements.txt
```

Start Command:

```bash
uvicorn main:app --host 0.0.0.0 --port 10000
```

Environment Variable:

```env
DATABASE_URL=<SUPABASE_CONNECTION_STRING>
```

---

### Frontend Deployment (Vercel)

Build Command:

```bash
npm run build
```

Output Directory:

```text
dist
```

Root Directory:

```text
frontend
```

---

## Future Enhancements

* Subject progress tracking
* Study session timer
* Analytics charts
* Weekly study reports
* AI-based study recommendations
* Dark/Light mode switch
* Authentication system

---

## Author

**Harish Anandh**

Anna University – Information Technology

Built using React, FastAPI, SQLAlchemy, Supabase, and Render.

