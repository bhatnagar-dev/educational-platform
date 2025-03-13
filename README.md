# 📚 Educational Platform - React App  
A web-based educational platform built using React for students, teachers, and institute administrators. This project demonstrates authentication, role-based dashboards, course management, and assignment handling.
## 🚀 Features Implemented  

### 🔐 Authentication & Authorization
- Login for **Students, Teachers, and Institute Admins**.
- Role-based redirection after login.
- Form validation (email format, password length, required fields).

### 📘 Student Dashboard
- View list of **enrolled courses**.
- Access **course materials and announcements**.
- Submit assignments (text input or file upload).

### 👨‍🏫 Teacher Dashboard
- **Manage Courses** (Create, edit, delete).
- **View & grade assignments** submitted by students.
- **Post announcements** to students.

### 🏫 Institute Dashboard
- **Manage Users** (View list of students & teachers).
- **Institute Details** (Name, Address, Contact Info).
- **Analytics** (Total students, courses, etc.).

## 🛠️ Technical Stack
- **React (Vite)**
- **React Router** (for navigation & protected routes)
- **React Context API** (for state management)
- **Tailwind CSS** (for styling)
- **Mock API** (JSON files to simulate backend data)
- **React Hooks** (`useState`, `useEffect`, `useContext`)

## 🏗️ Project Setup Instructions

### 1️⃣ Clone the Repository
```sh
git clone https://github.com/bhatnagar-dev/educational-platform.git
cd educational-platform
npm install
npm run dev
