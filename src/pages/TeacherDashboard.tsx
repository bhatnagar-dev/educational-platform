import React, { useState } from "react";
import styled from "styled-components";
import { useAuth } from "../context/AuthContext";

const DashboardContainer = styled.div`
  padding: 25px;
  background: #424769;
  border-radius: 12px 0px 12px 12px;
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.1);
  font-family: "Arial", sans-serif;
  width: 100%;
`;

const Section = styled.div`
  background: #8174A0;
  padding: 20px;
  margin: 20px 0;
  border-radius: 10px 0px 10px 10px;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.65);
`;

const Button = styled.button`
  padding: 10px;
  background: #18230F;
  color: white;
  font-weight: bold;
  border: none;
  border-radius: 8px 0px 8px 8px;
  cursor: pointer;
  transition: 0.3s ease;
  display: block;
  width: 10%;
  text-align: center;
  &:hover {
    background: linear-gradient(135deg, #0056b3, #003b80);
  }
`;

const Input = styled.input`
  width: 30%;
  padding: 12px;
  margin: 8px 0;
  border-radius: 8px 0px 8px 8px;
  border: 1px solid #ccc;
  font-size: 16px;
  background: #E2E0C8;
  &:focus {
    outline: none;
    border-color: #007bff;
    box-shadow: 0 0 6px rgba(0, 123, 255, 0.3);
  }
`;

const TextArea = styled.textarea`
  width: 30%;
  padding: 12px;
  margin: 8px 0;
  background: #E2E0C8;
  border-radius: 8px 0px 8px 8px;
  border: 1px solid #ccc;
  font-size: 16px;
  display: flex;
  flex-direction: column;
  &:focus {
    outline: none;
    border-color: #007bff;
    box-shadow: 0 0 6px rgba(0, 123, 255, 0.3);
  }
`;

const CourseCard = styled.div`
  background: #8174A0;
  padding: 15px;
  border: none;
  margin: 10px 0;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.08);
`;

const Announcement = styled.p`
  background: #fffae6;
  padding: 10px;
  border-left: 5px solid #ffc107;
  border-radius: 5px 0px 5px 5px;
  margin: 5px 0;
`;

const StyledTitle = styled.p`
  display: flex;
  position: relative;
  flex-direction: row;
  justify-content: center;
  gap: 10px;
`;

const TeacherDashboard: React.FC = () => {
  const { user, logout } = useAuth();

  // State for managing courses
  const [courses, setCourses] = useState<{ id: number; name: string; description: string }[]>([]);
  const [courseName, setCourseName] = useState("");
  const [courseDescription, setCourseDescription] = useState("");

  // State for assignments
  const [submissions, setSubmissions] = useState<{ student: string; content: string; grade?: number; feedback?: string }[]>([
    { student: "John Doe", content: "Assignment 1 submission", grade: undefined, feedback: "" },
  ]);

  // State for announcements
  const [announcements, setAnnouncements] = useState<string[]>([]);
  const [announcementText, setAnnouncementText] = useState("");

  // Add a new course
  const addCourse = () => {
    if (!courseName || !courseDescription) return alert("Please enter course details.");
    const newCourse = { id: Date.now(), name: courseName, description: courseDescription };
    setCourses([...courses, newCourse]);
    setCourseName("");
    setCourseDescription("");
  };

  // Remove a course
  const removeCourse = (id: number) => {
    setCourses(courses.filter(course => course.id !== id));
  };

  // Post an announcement
  const postAnnouncement = () => {
    if (!announcementText) return alert("Enter an announcement.");
    setAnnouncements([...announcements, announcementText]);
    setAnnouncementText("");
  };

  // Mark an assignment
  const markAssignment = (index: number, grade: number, feedback: string) => {
    const updatedSubmissions = [...submissions];
    updatedSubmissions[index] = { ...updatedSubmissions[index], grade, feedback };
    setSubmissions(updatedSubmissions);
  };

  return (
    <DashboardContainer>
        <StyledTitle>
      <h2>👩‍🏫 Welcome, {user?.firstName} (Teacher)</h2>
      <Button onClick={logout}>Logout</Button>
      </StyledTitle>
      {/* Manage Courses */}
      <Section>
        <h3>📚 Manage Courses</h3>
        <Input type="text" placeholder="Course Name" value={courseName} onChange={(e) => setCourseName(e.target.value)} />
        <TextArea placeholder="Course Description" value={courseDescription} onChange={(e) => setCourseDescription(e.target.value)} />
        <Button onClick={addCourse}>➕ Add Course</Button>

        <h4>Your Courses:</h4>
        {courses.length === 0 ? <p>No courses added yet.</p> : courses.map((course) => (
          <CourseCard key={course.id}>
            <p><strong>{course.name}</strong>: {course.description}</p>
            <Button onClick={() => removeCourse(course.id)}>❌ Remove</Button>
          </CourseCard>
        ))}
      </Section>

      {/* View & Mark Assignments */}
      <Section>
        <h3>📝 Student Submissions</h3>
        {submissions.length === 0 ? <p>No submissions yet.</p> : submissions.map((submission, index) => (
          <CourseCard key={index}>
            <div>
              <p><strong>{submission.student}:</strong> {submission.content}</p>
              <Input type="number" placeholder="Grade (0-100)" onChange={(e) => markAssignment(index, Number(e.target.value), submission.feedback || "")} />
              <TextArea placeholder="Feedback" onChange={(e) => markAssignment(index, submission.grade || 0, e.target.value)} />
            </div>
          </CourseCard>
        ))}
      </Section>

      {/* Announcements */}
      <Section>
        <h3>📢 Post Announcements</h3>
        <TextArea placeholder="Write an announcement..." value={announcementText} onChange={(e) => setAnnouncementText(e.target.value)} />
        <Button onClick={postAnnouncement}>📨 Post Announcement</Button>

        <h4>Course Announcements:</h4>
        {announcements.length === 0 ? <p>No announcements yet.</p> : announcements.map((msg, index) => (
          <Announcement key={index}>📢 {msg}</Announcement>
        ))}
      </Section>
    </DashboardContainer>
  );
};

export default TeacherDashboard;
