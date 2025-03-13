import React, { useState } from "react";
import styled from "styled-components";
import { useAuth } from "../context/AuthContext";

const DashboardContainer = styled.div`
  max-width: auto;
  margin: 5px auto;
  padding: 15x;
  background: #ffffff;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.15);
  font-family: "Poppins", sans-serif;
`;

const Section = styled.div`
  background: #ffffff;
  padding: 20px;
  margin: 15px 0;
  border-radius: 10px 0px 10px 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const Button = styled.button`
  padding: 12px;
  background: #6a0572;
  color: white;
  border: none;
  border-radius: 8px 0px 8px 8px;
  cursor: pointer;
  font-size: 16px;
  font-weight: bold;
  transition: all 0.3s ease;

  &:hover {
    background: #52045a;
    transform: scale(1.05);
  }
`;

const RemoveButton = styled(Button)`
  background: #D9EAFD;
  border: 1px #000;
  border-radius: 10px 0px 10px 10px;
  color: #000;

  &:hover {
    background: #000;
    color: #fff;
  }
`;

const Input = styled.input`
  width: 30%;
  padding: 12px;
  margin: 10px 0;
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

const Select = styled.select`
  width: 30%;
  padding: 12px;
  margin: 10px 0;
  border-radius: 8px 0px 8px 8px;
  border: 2px solid #ccc;
  font-size: 16px;

  &:focus {
    border-color: #6a0572;
    outline: none;
    box-shadow: 0 0 8px rgba(106, 5, 114, 0.3);
  }
`;

const TextArea = styled.textarea`
  width: 70%;
  padding: 12px;
  margin: 10px 0;
  border-radius: 8px 0px 8px 8px;
  border: 2px solid #ccc;
  font-size: 16px;

  &:focus {
    border-color: #6a0572;
    outline: none;
    box-shadow: 0 0 8px rgba(106, 5, 114, 0.3);
  }
`;

const UserCard = styled.div`
  background: #A5BFCC;
  padding: 15px;
  border-radius: 10px 0px 10px 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.08);
`;

const Title = styled.h2`
  color: #6a0572;
  font-size: 26px;
  text-align: center;

`;

const StyledTitle = styled.div`
margin-top: 10px; 
`;

const SubTitle = styled.h3`
  color: #333;
  font-size: 20px;
  margin-top: 10px;
`;

const AnalyticsBox = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 10px;
`;

const StatCard = styled.div`
  background: #6a0572;
  color: white;
  padding: 15px;
  border-radius: 8px 0px 8px 8px;
  text-align: center;
  width: 45%;
  font-size: 16px;
  font-weight: bold;
`;

const StyledInput = styled.div`
display: flex;
position: relative;
gap: 15px;
`;

const StyledButtonWrappper = styled.div`
display: flex;
position: relative;
justify-content: end;
margin-right: 20px;
`;


const InstituteDashboard: React.FC = () => {
  const { user, logout } = useAuth();

  // Users State
  const [users, setUsers] = useState<{ id: number; name: string; role: string }[]>([
    { id: 1, name: "Alice Johnson", role: "Student" },
    { id: 2, name: "Bob Smith", role: "Teacher" },
  ]);
  const [newUser, setNewUser] = useState({ name: "", role: "" });

  // Institute Info State
  const [instituteInfo, setInstituteInfo] = useState({
    name: "ABC Institute",
    address: "123 Main St, City",
    contact: "123-456-7890",
  });

  // Add a User
  const addUser = () => {
    if (!newUser.name || !newUser.role) return alert("Enter valid user details.");
    setUsers([...users, { id: Date.now(), ...newUser }]);
    setNewUser({ name: "", role: "" });
  };

  // Remove a User
  const removeUser = (id: number) => {
    setUsers(users.filter(user => user.id !== id));
  };

  // Update Institute Info
  const updateInstituteInfo = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setInstituteInfo({ ...instituteInfo, [e.target.name]: e.target.value });
  };

  return (
    <DashboardContainer>
      <StyledTitle><Title>Welcome, {user?.firstName} (Institute Admin)</Title></StyledTitle>
      <StyledButtonWrappper><Button onClick={logout}>Logout</Button></StyledButtonWrappper>

      {/* Manage Users */}
      <Section>
        <SubTitle>Manage Users</SubTitle>
        <StyledInput>
        <Input type="text" placeholder="User Name" value={newUser.name} onChange={(e) => setNewUser({ ...newUser, name: e.target.value })} />
        <Select onChange={(e) => setNewUser({ ...newUser, role: e.target.value })} value={newUser.role}>
          <option value="">Select Role</option>
          <option value="Student">Student</option>
          <option value="Teacher">Teacher</option>
        </Select>
        <Button onClick={addUser}>Add User</Button>
        </StyledInput>

        <h4>Users List:</h4>
        {users.map((user) => (
          <UserCard key={user.id}>
            <p><strong>{user.name}</strong> ({user.role})</p>
            <RemoveButton onClick={() => removeUser(user.id)}>Remove</RemoveButton>
          </UserCard>
        ))}
      </Section>

      {/* Institute Info */}
      <Section>
        <SubTitle>Institution Information</SubTitle>
        <Input type="text" name="name" value={instituteInfo.name} onChange={updateInstituteInfo} placeholder="Institute Name" />
        <TextArea name="address" value={instituteInfo.address} onChange={updateInstituteInfo} placeholder="Address" />
        <Input type="text" name="contact" value={instituteInfo.contact} onChange={updateInstituteInfo} placeholder="Contact Info" />
      </Section>

      {/* Analytics & Reports */}
      <Section>
        <SubTitle>Analytics & Reports</SubTitle>
        <AnalyticsBox>
          <StatCard>Total Users: {users.length}</StatCard>
          <StatCard>Total Courses: 10 (Mock Data)</StatCard>
        </AnalyticsBox>
      </Section>
    </DashboardContainer>
  );
};

export default InstituteDashboard;
