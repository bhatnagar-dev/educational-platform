import React, { useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { motion } from "framer-motion";

const SignupContainer = styled.div`
  display: flex;
  height: 100vh;
  justify-content: center;
  align-items: center;
  background: #09122C;
`;

const GlassCard = styled(motion.div)`
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(12px);
  padding: 2.5rem;
  border-radius: 16px 0px 16px 16px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
  width: 420px;
  text-align: center;
  border: 1px solid rgba(255, 255, 255, 0.2);
  transition: 0.3s ease-in-out;
`;

const Title = styled.h2`
  color: #fff;
  font-size: 24px;
  margin-bottom: 1rem;
  font-weight: 600;
`;

const InputWrapper = styled.div`
  position: relative;
  width: 100%;
  margin: 10px 0;
`;

const Input = styled.input`
  width: 92%;
  padding: 1rem;
  border-radius: 10px 0px 10px 10px;
  border: none;
  font-size: 16px;
  background: rgba(255, 255, 255, 0.2);
  color: #fff;
  outline: none;
  transition: 0.3s;

  &:focus {
    box-shadow: 0 0 8px rgba(255, 255, 255, 0.5);
  }

  &::placeholder {
    color: transparent;
  }
`;

const Label = styled.label`
  position: absolute;
  top: 50%;
  left: 12px;
  transform: translateY(-50%);
  font-size: 14px;
  color: #ddd;
  transition: 0.3s ease-in-out;
  pointer-events: none;

  ${Input}:focus + &,
  ${Input}:not(:placeholder-shown) + & {
    top: 10px;
    font-size: 12px;
    color: #fff;
  }
`;

const Select = styled.select`
  width: 100%;
  padding: 1rem;
  border-radius: 10px 0px 10px 10px;
  border: none;
  font-size: 16px;
  background: rgba(255, 255, 255, 0.2);
  color: #fff;
  outline: none;

  &:focus {
    box-shadow: 0 0 8px rgba(255, 255, 255, 0.5);
  }
`;

const Button = styled.button`
  width: 100%;
  padding: 1rem;
  margin-top: 1rem;
  background: linear-gradient(135deg, #ff758c, #ff7eb3);
  color: white;
  font-size: 18px;
  font-weight: bold;
  border: none;
  border-radius: 10px 0px 10px 10px;
  cursor: pointer;
  transition: 0.3s ease-in-out;

  &:hover {
    background: linear-gradient(135deg, #ff5a85, #ff3d8b);
    transform: scale(1.03);
  }
`;

const ErrorMessage = styled.p`
  color: #ff4d4d;
  font-size: 14px;
  margin-bottom: 10px;
`;

const Signup: React.FC = () => {
  const { signup } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    firstName: "",
    lastName: "",
    age: "",
    country: "",
    role: "",
    password: "",
  });

  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSignup = () => {
    if (!formData.email || !formData.firstName || !formData.lastName || !formData.age || !formData.country || !formData.role || !formData.password) {
      setError("All fields are required!");
      return;
    }

    signup(formData);
    navigate("/login");
  };

  return (
    <SignupContainer>
      <GlassCard 
        initial={{ y: -50, opacity: 0 }} 
        animate={{ y: 0, opacity: 1 }} 
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <Title>Sign Up</Title>
        {error && <ErrorMessage>{error}</ErrorMessage>}

        <InputWrapper>
          <Input type="email" name="email" placeholder=" " value={formData.email} onChange={handleChange} />
          <Label>Email</Label>
        </InputWrapper>

        <InputWrapper>
          <Input type="text" name="firstName" placeholder=" " value={formData.firstName} onChange={handleChange} />
          <Label>First Name</Label>
        </InputWrapper>

        <InputWrapper>
          <Input type="text" name="lastName" placeholder=" " value={formData.lastName} onChange={handleChange} />
          <Label>Last Name</Label>
        </InputWrapper>

        <InputWrapper>
          <Input type="number" name="age" placeholder=" " value={formData.age} onChange={handleChange} />
          <Label>Age</Label>
        </InputWrapper>

        <InputWrapper>
          <Input type="text" name="country" placeholder=" " value={formData.country} onChange={handleChange} />
          <Label>Country</Label>
        </InputWrapper>

        <Select name="role" value={formData.role} onChange={handleChange}>
          <option value="">Select Role</option>
          <option value="student">Student</option>
          <option value="teacher">Teacher</option>
          <option value="admin">Institute Admin</option>
        </Select>

        <InputWrapper>
          <Input type="password" name="password" placeholder=" " value={formData.password} onChange={handleChange} />
          <Label>Password</Label>
        </InputWrapper>

        <Button onClick={handleSignup}>Sign Up</Button>
      </GlassCard>
    </SignupContainer>
  );
};

export default Signup;
