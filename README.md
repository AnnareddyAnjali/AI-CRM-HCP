

# AI CRM for Healthcare Professionals

## Project Overview

**AI CRM for Healthcare Professionals** is a full-stack web application developed to help pharmaceutical companies and healthcare organizations manage Healthcare Professionals (HCPs), track interactions, generate AI-powered summaries, and produce reports.

The system provides a secure login mechanism using JWT authentication and offers a modern dashboard with analytics and AI capabilities.

---

# Objectives

The main objectives of this project are:

* Manage Healthcare Professionals (HCPs)
* Record doctor interactions
* Generate AI-powered summaries using Groq LLM
* View analytics on an interactive dashboard
* Generate downloadable PDF reports
* Secure the application using JWT Authentication

---

# Technology Stack

## Frontend

* React.js
* Material UI
* React Router DOM
* Axios
* Recharts

## Backend

* FastAPI
* SQLAlchemy
* Pydantic
* JWT Authentication
* Passlib (Bcrypt)
* ReportLab
* Groq API

## Database

* MySQL

---

# Project Architecture

```
Frontend (React)
       │
       │ REST API
       ▼
Backend (FastAPI)
       │
       ▼
MySQL Database

        │
        ▼
Groq AI API
```

---

# Main Features

## User Authentication

* User Registration
* User Login
* JWT Token Generation
* Protected Routes
* Logout

---

## Dashboard

The dashboard displays:

* Total Healthcare Professionals
* Total Interactions
* Positive Interactions
* Follow-up Count
* Bar Chart
* Pie Chart
* Download PDF Report

---

## Healthcare Professional Management

Users can

* Add HCP
* Edit HCP
* Delete HCP
* Search HCP
* View HCP List

---

## Interaction Management

Users can

* Add Interaction
* Edit Interaction
* Delete Interaction
* Search Interaction
* Track Follow-up Date
* Store Doctor Notes

---

## AI Summary

Doctor notes can be summarized using the Groq Large Language Model.

Example

Doctor Notes

```
Doctor is interested in the new diabetes medicine but requested more clinical trial data before prescribing.
```

Generated AI Summary

```
Doctor showed interest in the diabetes medication and requested additional clinical evidence before adoption.
```

---

## AI Assistant

Users can ask healthcare-related questions.

Example

```
What are the symptoms of diabetes?
```

The Groq AI model generates an intelligent response.

---

## Reports

Generate downloadable PDF reports.

Current Report

* Healthcare Professionals Report

Future Reports

* Interaction Report
* Monthly Report
* Dashboard Report

---

# Database Tables

## users

| Column   |
| -------- |
| id       |
| name     |
| email    |
| username |
| password |
| role     |

---

## hcp

| Column         |
| -------------- |
| id             |
| name           |
| specialization |
| hospital       |
| city           |
| phone          |
| email          |

---

## interaction

| Column           |
| ---------------- |
| id               |
| hcp_id           |
| date             |
| interaction_type |
| summary          |
| sentiment        |
| follow_up        |

---

# Folder Structure

```
AI-CRM-HCP

backend
│
├── app
│   ├── auth
│   ├── models
│   ├── routes
│   ├── schemas
│   ├── database.py
│   └── main.py
│
├── requirements.txt
└── .env

frontend
│
├── src
│   ├── api
│   ├── components
│   ├── pages
│   ├── App.jsx
│   └── main.jsx
│
└── package.json
```

---

# Required Software

Install the following before running the project:

* Python 3.12+
* Node.js
* MySQL Server
* MySQL Workbench
* VS Code

---

# Backend Setup

## Step 1

Open terminal

```
cd backend
```

---

## Step 2

Create virtual environment

```
python -m venv venv
```

---

## Step 3

Activate virtual environment

Windows

```
venv\Scripts\activate
```

---

## Step 4

Install dependencies

```
pip install -r requirements.txt
```

If requirements.txt is unavailable:

```
pip install fastapi
pip install uvicorn
pip install sqlalchemy
pip install pymysql
pip install python-dotenv
pip install groq
pip install reportlab
pip install python-jose
pip install passlib[bcrypt]
pip install email-validator
```

---

## Step 5

Create MySQL database

```
CREATE DATABASE ai_crm;
```

---

## Step 6

Configure `.env`

```
DATABASE_URL=mysql+pymysql://root:YOUR_PASSWORD@localhost:3306/ai_crm

GROQ_API_KEY=YOUR_GROQ_API_KEY

MODEL_NAME=llama-3.3-70b-versatile
```

Replace the placeholder values with your own database password and Groq API key.

---

## Step 7

Run backend

```
uvicorn app.main:app --reload
```

Backend URL

```
http://127.0.0.1:8000
```

Swagger Documentation

```
http://127.0.0.1:8000/docs
```

---

# Frontend Setup

Open another terminal

```
cd frontend
```

Install packages

```
npm install
```

Run application

```
npm run dev
```

Frontend URL

```
http://localhost:5173
```

---

# Login Flow

New User

```
Register
↓

Create Account
↓

Login
↓

Dashboard
```

Existing User

```
Login
↓

Dashboard
```

---

# API Endpoints

## Authentication

```
POST /users/register
POST /auth/login
```

---

## Healthcare Professionals

```
GET /hcp
POST /hcp
PUT /hcp/{id}
DELETE /hcp/{id}
```

---

## Interactions

```
GET /interaction
POST /interaction
PUT /interaction/{id}
DELETE /interaction/{id}
```

---

## AI

```
POST /ai/summary
POST /ai/chat
```

---

## Reports

```
GET /report/hcp
```

---

# Security Features

* JWT Authentication
* Password Hashing using Bcrypt
* Protected Routes
* CORS Configuration
* Environment Variables for Secrets

---

# Future Enhancements

* Admin Dashboard
* Role-Based Access Control
* Email Notifications
* Appointment Scheduling
* File Uploads
* Doctor Profile Images
* Export to Excel
* Data Visualization Improvements
* Cloud Deployment
* Audit Logs
* Password Reset
* Two-Factor Authentication

---

# Learning Outcomes

This project demonstrates practical experience with:

* Full Stack Development
* REST API Design
* React.js
* FastAPI
* SQLAlchemy ORM
* MySQL Database Design
* JWT Authentication
* AI Integration using Groq
* PDF Report Generation
* Dashboard Analytics
* CRUD Operations
* Component-Based UI Design

---

# Conclusion

The AI CRM for Healthcare Professionals is a modern CRM platform designed to simplify healthcare relationship management. It combines secure authentication, Healthcare Professional management, interaction tracking, AI-assisted summaries, reporting, and dashboard analytics into a single application. The project showcases full-stack web development skills while demonstrating how generative AI can enhance customer relationship management workflows in the healthcare domain.
