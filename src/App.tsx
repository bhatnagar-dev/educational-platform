import { Routes, Route } from "react-router-dom";
import StudentDashboard from "./pages/StudentDashboard";
import TeacherDashboard from "./pages/TeacherDashboard";
import InstituteDashboard from "./pages/InstituteDashboard";
import SignUp from "./pages/SignUp";
import Login from "./pages/login";
import ProtectedRoute from "./routes/ProtectedRoute";
import "@fontsource/poppins";
import GlobalStyles from "./styles/GlobalStyles";

function App() {
  return (
    <><GlobalStyles /><Routes>
      <Route path="/" element={<Login />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />

      <Route path="/student-dashboard" element={<ProtectedRoute><StudentDashboard /></ProtectedRoute>} />
      <Route path="/teacher-dashboard" element={<ProtectedRoute><TeacherDashboard /></ProtectedRoute>} />
      <Route path="/institute-dashboard" element={<ProtectedRoute><InstituteDashboard /></ProtectedRoute>} />
    </Routes></>
  );
}

export default App;
