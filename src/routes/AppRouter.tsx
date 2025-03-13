import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "../pages/login";
import StudentDashboard from "../pages/StudentDashboard";
import InstituteDashboard from "../pages/InstituteDashboard";
import TeacherDashboard from "../pages/TeacherDashboard";

const AppRouter: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/student-dashboard" element={<StudentDashboard />} />
        <Route path="/teacher-dashboard" element={<TeacherDashboard />} />
        <Route path="/institute-dashboard" element={<InstituteDashboard />} />
      </Routes>
    </Router>
  );
};

export default AppRouter;
