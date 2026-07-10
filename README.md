# 🎓 College Event Management System (EventHub)

A full-stack web application developed to simplify the management of college events. The system allows administrators to create and manage events while enabling students and visitors to explore events and register easily.

---

## 📌 Features

### 👤 Visitor

* View upcoming college events
* Search and filter events
* View complete event details
* Register for events without creating an account
* Receive registration confirmation

### 👨‍🎓 Student/User

* Secure Login and Registration
* View available events
* Register for events
* View My Registrations
* Update Profile
* Notifications

### 👨‍💼 Admin

* Dashboard
* Create Events
* Edit Events
* Delete Events
* Manage Registrations
* Make Announcements
* View Participants
* Settings

---

## 🛠 Tech Stack

### Frontend

* HTML5
* CSS3
* JavaScript

### Backend

* Node.js
* Express.js

### Database

* MongoDB
* Mongoose

---

## 📁 Project Structure

```
College-Event-Management/
│
├── backend/
│   ├── src/
│   ├── models/
│   ├── routes/
│   ├── controllers/
│   ├── server.js
│   └── package.json
│
├── frontend/
│   ├── announcements/
│   ├── create-event/
│   ├── dashboard/
│   ├── edit-event/
│   ├── event-details/
│   ├── events/
│   ├── login/
│   ├── my-registrations/
│   ├── notifications/
│   ├── profile/
│   ├── public-registration/
│   ├── register/
│   ├── registrations/
│   ├── settings/
│   ├── index.html
│   └── style.css
│
└── README.md
```

---

## ⚙️ Installation

### Clone the repository

```bash
git clone https://github.com/balamakhilasai04-pixel/College-Event-Management

```

### Navigate to the project

```bash
cd College-Event-Management
```

### Install backend dependencies

```bash
cd backend
npm install
```

### Create a `.env` file

```env
MONGO_URI=your_mongodb_connection_string
PORT=5000
JWT_SECRET=your_secret_key
```

### Start the backend

```bash
node src/server.js
```

### Start the frontend

Open `frontend/index.html` using Live Server.

---

## ✨ Main Modules

* Home Page
* Login
* Registration
* Dashboard
* Events
* Event Details
* Visitor Registration
* My Registrations
* Create Event
* Edit Event
* Announcements
* Notifications
* Profile
* Settings

---

## 👩‍💻 Developed By

**Akhila Balam**

---

## 📄 License

This project was developed for educational purposes.
