import React, { useState } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import { useAuth } from "../context/AuthContext";

const DashboardContainer = styled.div`
  max-width: 1100px;
  margin: 40px auto;
  padding: 30px;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 16px 0px 16px 16px;
  backdrop-filter: blur(10px);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
  text-align: center;
`;

const Title = styled.h2`
  color: #fff;
  font-size: 26px;
  font-weight: bold;
  margin-bottom: 20px;
`;

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
  margin-top: 20px;
`;

const CourseCard = styled(motion.div)`
  background: rgba(255, 255, 255, 0.3);
  padding: 20px;
  border-radius: 12px 0px 12px 12px;
  text-align: center;
  color: white;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
  cursor: pointer;
  transition: 0.3s;
  &:hover {
    background: #000;
    color: #fff;
    transform: scale(1.05);
  }
`;

const CourseDetails = styled(motion.div)`
  margin-top: 30px;
  background: rgba(255, 255, 255, 0.3);
  padding: 25px;
  border-radius: 12px 0px 12px 12px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
  color: white;
  &:hover {
    background: #000;
    color: #fff;
    transform: scale(1.05);
  }
`;

const Button = styled.button`
  margin-top: 20px;
  padding: 12px 20px;
  background: linear-gradient(135deg, #ff4081, #ff1744);
  color: white;
  font-size: 16px;
  font-weight: bold;
  border: none;
  border-radius: 8px 0px 8px 8px;
  cursor: pointer;
  transition: 0.3s;
  &:hover {
    background: linear-gradient(135deg, #e91e63, #d50000);
    transform: translateY(-2px);
  }
`;

const Input = styled.input`
  width: 95%;
  padding: 12px;
  margin-top: 12px;
  border-radius: 8px 0px 8px 8px;
  border: none;
  font-size: 16px;
  background: rgba(255, 255, 255, 0.2);
  color: white;
  backdrop-filter: blur(5px);
`;

const Textarea = styled.textarea`
  width: 95%;
  padding: 12px;
  margin-top: 12px;
  border-radius: 8px 0px 8px 8px;
  border: none;
  font-size: 16px;
  min-height: 120px;
  background: rgba(255, 255, 255, 0.2);
  color: white;
  backdrop-filter: blur(5px);
`;

const LogoutButton = styled(Button)`
  background: linear-gradient(135deg, #ff4081, #ff1744);
  &:hover {
    background: linear-gradient(135deg, #e91e63, #d50000);
  }
`;

const StudentDashboard: React.FC = () => {
  const { user, logout } = useAuth();

  const mockCourses = [
    { id: 1, name: "React Basics", description: "Learn the basics of React." },
    { id: 2, name: "Advanced JavaScript", description: "Master JavaScript concepts." },
    { id: 3, name: "TypeScript Mastery", description: "Understand TypeScript deeply." },
  ];

  const [selectedCourse, setSelectedCourse] = useState<any | null>(null);
  const [assignment, setAssignment] = useState<File | null>(null);
  const [textSubmission, setTextSubmission] = useState("");

  const handleCourseSelect = (course: any) => {
    setSelectedCourse(course);
  };

  const handleAssignmentUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setAssignment(event.target.files[0]);
    }
  };

  const handleTextSubmission = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setTextSubmission(event.target.value);
  };

  const handleSubmitAssignment = () => {
    if (assignment) {
      alert(`Assignment "${assignment.name}" uploaded successfully!`);
    } else if (textSubmission) {
      alert(`Text submission received: "${textSubmission}"`);
    } else {
      alert("Please submit either a file or text.");
    }
  };

  return (
    <div style={{ background: "#121212", minHeight: "100vh", padding: "50px 20px" }}>
      <DashboardContainer>
        <Title>Welcome, {user?.firstName} 👋</Title>
        <LogoutButton onClick={logout}>Logout</LogoutButton>

        <h3 style={{ color: "white", marginTop: "30px" }}>Your Courses</h3>
        <GridContainer>
          {mockCourses.map((course) => (
            <CourseCard
              key={course.id}
              onClick={() => handleCourseSelect(course)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <h4>{course.name}</h4>
            </CourseCard>
          ))}
        </GridContainer>

        {selectedCourse && (
          <CourseDetails
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0, transition: { duration: 0.4 } }}
          >
            <h3>{selectedCourse.name}</h3>
            <p>{selectedCourse.description}</p>

            <h4>Submit Assignment</h4>
            <Input type="file" onChange={handleAssignmentUpload} />
            <Textarea
              placeholder="Write your assignment..."
              value={textSubmission}
              onChange={handleTextSubmission}
            />
            <Button onClick={handleSubmitAssignment}>Submit</Button>
          </CourseDetails>
        )}
      </DashboardContainer>
    </div>
  );
};

export default StudentDashboard;
