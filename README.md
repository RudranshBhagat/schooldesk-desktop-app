# MEAN Stack Full-Stack Project


This is a full-stack web application built using the MEAN stack.


## Tech Stack

- MongoDB
- Express.js
- Angular
- Node.js


## Project Structure

mean-stack-project/
├── frontend/ # Angular frontend
├── backend/ # Node + Express backend
├── data/ # JSON / sample data
└── README.md


## Frontend Setup

```bash
cd frontend
npm install
ng start

The frontend will run on:
http://localhost:4200



---

## Add Backend Setup Instructions

Paste:

```md
## Backend Setup

```bash
cd backend
npm install
node server.js


## Environment Variables

Create a `.env` file in the `backend/` folder:
```env
PORT=3000
MONGO_URL=mongodb://localhost:27017/your_database_name
JWT_SECRET=your_secret_key_here
```

This way you're telling users what variables they need without exposing your real credentials. Also make sure your actual `.env` file is in `.gitignore` so it never gets pushed:

## Project Screenshots

### Home Page
![Home](images/home.png)

### Admission Form
![Admission form](images/admission-form.png)

### Teachers
![Teachers](images/teachers.png)

### Gallery
![Gallery](images/gallery.png)

### Login
![Login](images/login.png)

### Notice Board
![Notice](images/notice.png)

###  Dashboard
![Dashboard](images/dashboard-1.png)

![Dashboard](images/dashboard-2.png)

![Dashboard](images/dashboard-3.png)

![Dashboard](images/dashboard-4.png)