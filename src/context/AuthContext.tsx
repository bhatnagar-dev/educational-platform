import { createContext, useContext, useState, ReactNode } from "react";
import { useNavigate } from "react-router-dom";

interface User {
  email: string;
  password: string;
  role: string;
  firstName?: string;
  lastName?: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => void;
  signup: (userData: User) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(() => JSON.parse(localStorage.getItem("currentUser") || "null"));
  const navigate = useNavigate();

  // Function to retrieve all stored users
  const getStoredUsers = (): User[] => {
    return JSON.parse(localStorage.getItem("users") || "[]");
  };

  const login = (email: string, password: string) => {
    const users = getStoredUsers();
    const foundUser = users.find((u) => u.email === email && u.password === password);

    if (foundUser) {
      setUser(foundUser);
      localStorage.setItem("currentUser", JSON.stringify(foundUser));

      // Redirect based on user role
      if (foundUser.role === "student") navigate("/student-dashboard");
      else if (foundUser.role === "teacher") navigate("/teacher-dashboard");
      else navigate("/institute-dashboard");
    } else {
      alert("Invalid credentials");
    }
  };

  const signup = (userData: User) => {
    const users = getStoredUsers();

    // Check if email already exists
    if (users.some((u) => u.email === userData.email)) {
      alert("User with this email already exists!");
      return;
    }

    // Save new user
    users.push(userData);
    localStorage.setItem("users", JSON.stringify(users));
    alert("User registered! Please login.");
  };

  const logout = () => {
    localStorage.removeItem("currentUser");
    setUser(null);
    navigate("/login");
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
};