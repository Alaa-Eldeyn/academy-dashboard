import "./App.css";
import Layout from "./Layout";
import { Route, Routes } from "react-router-dom";
import Profile from "./pages/Profile";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ProtectedRoute from "./ProtectedRoute";
import { Books, AddBooks } from "./pages/Books";
import { Blogs, AddBlog, ViewBlog } from "./pages/Blogs";
import { Taps } from "./pages/Categories";
import { AddCourse, DeletePending, Details, Pending, PendingEnrolls, Published } from "./pages/Courses";
import { AddExam, Exams, Questions } from "./pages/Exams";
import { Dashboard } from "./pages/Dashboard";
import { AddSupervisor, Supervisors } from "./pages/Supervisors";
import { AddUsers, Users } from "./pages/Users";
import { ForgetPass, Login, ResetPass } from "./auth";
import Subscription from "./pages/Subscription/Subscription";

function App() {
  return (
    <>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/forget-pass" element={<ForgetPass />} />
        <Route path="/reset-pass" element={<ResetPass />} />
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Layout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Dashboard />} />
          <Route path="supervisors" element={<Supervisors />} />
          <Route path="supervisors/add-supervisor" element={<AddSupervisor />} />
          <Route path="users" element={<Users />} />
          <Route path="users/add-user" element={<AddUsers />} />
          <Route path="categories" element={<Taps />} />
          <Route path="pending-courses" element={<Pending />} />
          <Route path="pending-enrolls" element={<PendingEnrolls />} />
          <Route path="pending-deletion-courses" element={<DeletePending />} />
          <Route
            path="deletion-course-details/:id"
            element={<Details isPublished={true} />}
          />
          <Route
            path="course-details/:id"
            element={<Details isPublished={false} />}
          />
          <Route
            path="published-course-details/:id"
            element={<Details isPublished={true} />}
          />
          <Route path="published-courses" element={<Published />} />
          <Route path="courses/add-course" element={<AddCourse />} />
          <Route path="exams" element={<Exams />} />
          <Route
            path="exams/add-exam"
            element={<AddExam isUpdateMode={false} />}
          />
          <Route
            path="exams/update-exam/:id"
            element={<AddExam isUpdateMode={true} />}
          />
          <Route path="exams/exam-questions/:id" element={<Questions />} />
          <Route path="blogs" element={<Blogs />} />
          <Route path="blogs/add-blog" element={<AddBlog />} />
          <Route
            path="blogs/update-blog/:id"
            element={<AddBlog isUpdateMode={true} />}
          />
          <Route path="blogs/blog/:id" element={<ViewBlog />} />
          <Route path="books" element={<Books />} />
          <Route
            path="books/add-book"
            element={<AddBooks isUpdateMode={false} details={false} />}
          />
          <Route
            path="books/update-book/:id"
            element={<AddBooks isUpdateMode={true} details={false} />}
          />
          <Route
            path="books/:id"
            element={<AddBooks isUpdateMode={false} details={true} />}
          />
          <Route path="profile" element={<Profile />} />
          <Route path="local-subscription" element={<Subscription />} />
        </Route>
      </Routes>
      <ToastContainer />
    </>
  );
}

export default App;
