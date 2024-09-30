import Layout from "./Layout";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Supervisors from "./pages/Supervisors";
import Users from "./pages/Users";
import PendingCourses from "./pages/Courses/PendingCourses";
import PublishedCourses from "./pages/Courses/PublishedCourses";
import Exams from "./pages/Exams";
import Profile from "./pages/Profile";
import Login from "./auth/Login";
import ForgetPass from "./auth/ForgetPass";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ProtectedRoute from "./ProtectedRoute";
import { Books, AddBooks } from "./pages/Books";
import { Blogs, AddBlog, ViewBlog } from "./pages/Blogs";
import { Taps } from "./pages/Categories";

function App() {
  return (
    <>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Layout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Dashboard />} />
          <Route path="forget-password" element={<ForgetPass />} />
          <Route path="supervisors" element={<Supervisors />} />
          <Route path="users" element={<Users />} />
          <Route path="categories" element={<Taps />} />
          <Route path="pending-courses" element={<PendingCourses />} />
          <Route path="published-courses" element={<PublishedCourses />} />
          <Route path="exams" element={<Exams />} />
          <Route path="blogs" element={<Blogs />} />
          <Route path="blogs/add-blog" element={<AddBlog />} />
          <Route path="blogs/update-blog/:id" element={<AddBlog isUpdateMode={true}/>} />
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
        </Route>
      </Routes>
      <ToastContainer />
    </>
  );
}

export default App;
