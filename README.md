# 🛠️ Authentication App - Backend (NestJS)

🚀 **Live API:** [Backend Deployed on Render](https://yolo-backend-mvyt.onrender.com)  

---

## 📌 Overview
This is the **backend** of an authentication system built with **NestJS**, **MongoDB**, **JWT Authentication**, and **Mongoose**. It provides:
- 🔹 **User Signup & Login**
- 🔹 **JWT-based Authentication**
- 🔹 **Protected Routes**
- 🔹 **Edit Profile Feature**
- 🔹 **Secure Password Hashing**

---

## ⚡ Tech Stack
- **NestJS** (Node.js Framework)
- **MongoDB** (Database)
- **Mongoose** (ODM)
- **JWT Authentication**
- **Render** (Deployment)

---

## 🚀 How to Run the Backend Locally

### 1️⃣ Clone the Repository
```sh
git clone https://github.com/Abhay9999Sh/Yolo-backend.git
cd backend
```
### **2 Install Dependencies**
```sh
npm install
```

### **3 Configure Environment Variables**
- Create a .env.local file in the root directory:
```sh
PORT=5000
MONGO_URL=your_mongodb_connection_string
JWT_SECRET=your_secret_key
JWT_EXPIRES_IN=1d
FRONTEND_URL=http://localhost:3000
```

### **4 Start the Development Server**
```sh
npm start
```

- **Backend will be available at http://localhost:5000.**

## 📌 API Endpoints (Consumed by Frontend)

- **`POST /auth/signup`** → Register a new user  
- **`POST /auth/login`** → Authenticate user & return JWT  
- **`GET /auth/me`** → Get logged-in user info (Protected)  
- **`POST /auth/logout`** → Logout user  
- **`GET /user/profile`** → Fetch user profile (Protected)  
- **`PUT /user/profile`** → Update user profile (Protected)  

📌 **These API endpoints are handled by the backend**.

🚀 **Live Demo:** [Frontend Deployed on Vercel](https://yolo-frontend-eight.vercel.app)  
🌐 **Frontend Repo:** [Frontend Repo](https://github.com/Abhay9999Sh/Yolo-frontend)
