# 🎓 Student Task Manager

A full-stack **Student Task Manager** web application that helps students organize, track, and manage their daily tasks efficiently. Built using modern technologies like React, Node.js, Express, and JWT authentication.

---

## 🚀 Features

* 🔐 User Authentication (Login/Register with JWT)
* 📝 Create, update, delete tasks
* 📌 Mark tasks as completed
* 📅 Task deadlines and scheduling
* 🔍 Filter and search tasks
* 📊 Dashboard for task overview
* 🌐 Responsive UI for all devices

---

## 🛠️ Tech Stack

### Frontend

* React.js
* CSS3 / Tailwind (if used)
* Axios

### Backend

* Node.js
* Express.js

### Database

* MongoDB (Mongoose)

### Authentication

* JSON Web Tokens (JWT)

---

## 📂 Project Structure

```
student-task-manager/
│
├── client/          # React frontend
│   ├── src/
│   └── public/
│
├── server/          # Node + Express backend
│   ├── routes/
│   ├── controllers/
│   ├── models/
│   └── middleware/
│
└── README.md
```

---

## ⚙️ Installation & Setup

### 1️⃣ Clone the repository

```
git clone https://github.com/your-username/student-task-manager.git
cd student-task-manager
```

---

### 2️⃣ Install dependencies

#### For backend:

```
cd server
npm install
```

#### For frontend:

```
cd client
npm install
```

---

### 3️⃣ Environment variables

Create a `.env` file in the **server** folder:

```
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

---

### 4️⃣ Run the application

#### Start backend:

```
cd server
npm start
```

#### Start frontend:

```
cd client
npm start
```

---

## 🌍 API Endpoints

### Auth Routes

* POST `/api/auth/register` → Register user
* POST `/api/auth/login` → Login user

### Task Routes

* GET `/api/tasks` → Get all tasks
* POST `/api/tasks` → Create task
* PUT `/api/tasks/:id` → Update task
* DELETE `/api/tasks/:id` → Delete task

---

## 🔒 Authentication Flow

1. User logs in or registers
2. Server generates JWT token
3. Token stored in frontend (localStorage)
4. Protected routes require token in headers

---


## 🚀 Deployment

* Frontend: Vercel / Netlify
* Backend: Render / Railway / Cyclic
* Database: MongoDB Atlas

---

## 🤝 Contributing

Contributions are welcome!

1. Fork the project
2. Create a new branch
3. Commit your changes
4. Push and create a Pull Request

---

## 📄 License

This project is licensed under the MIT License.

---

## 👨‍💻 Author

* Your Name
* GitHub: https://github.com/your-username

---

## 💡 Future Improvements

* Notifications & reminders
* Drag & drop task management
* Team collaboration
* Mobile app version

---
