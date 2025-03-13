import React, { useState } from "react";
import styled from "styled-components";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa"; // Import eye icons

const LoginContainer = styled.div`
  display: flex;
  height: 100vh;
  justify-content: center;
  align-items: center;
  background: #09122C;
`;

const Card = styled.div`
  background: #D9EAFD;
  padding: 2.5rem;
  border-radius: 12px 0px 12px 12px;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.75);
  width: 400px;
  text-align: center;
  animation: fadeIn 0.5s ease-in-out;

  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(-10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

const Title = styled.h2`
  color: #4a154b;
  font-size: 24px;
  margin-bottom: 1rem;
`;

const InputWrapper = styled.div`
  position: relative;
  width: 100%;
`;

const Input = styled.input`
  width: 92%;
  padding: 0.9rem;
  margin: 0.7rem 0;
  border-radius: 8px 0px 8px 8px;
  border: 2px solid #ccc;
  font-size: 16px;
  transition: all 0.3s ease-in-out;

  &:focus {
    border-color: #6a0572;
    outline: none;
    box-shadow: 0 0 8px rgba(106, 5, 114, 0.3);
  }
`;

const EyeButton = styled.button`
  position: absolute;
  right: 12px;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  cursor: pointer;
  font-size: 18px;
  color: #6a0572;

  &:hover {
    color: #52045a;
  }
`;

const Button = styled.button`
  width: 100%;
  padding: 0.9rem;
  margin-top: 1rem;
  background: #A888B5;
  color: white;
  font-size: 18px;
  font-weight: bold;
  border: none;
  border-radius: 8px 0px 8px 8px;
  cursor: pointer;
  transition: background 0.3s ease, transform 0.2s;

  &:hover {
    background: #52045a;
    transform: scale(1.05);
  }
`;

const SignUpButton = styled(Button)`
  background: #D9EAFD;
  margin-top: 0.7rem;
  color: #000;

  &:hover {
    background: #D9EAFD;
  }
`;

const Login: React.FC = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = () => {
    login(email, password);
  };

  return (
    <LoginContainer>
      <Card>
        <Title>Welcome Back 👋</Title>
        <Input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        {/* Password Input with Eye Icon */}
        <InputWrapper>
          <Input
            type={showPassword ? "text" : "password"}
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <EyeButton onClick={() => setShowPassword(!showPassword)}>
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </EyeButton>
        </InputWrapper>

        <Button onClick={handleLogin}>Login</Button>
        <SignUpButton onClick={() => navigate("/signup")}>Create an Account</SignUpButton>
      </Card>
    </LoginContainer>
  );
};

export default Login;
