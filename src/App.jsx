import Layout from './Layout'
import './App.css'
import { Route, Routes } from 'react-router-dom';
import Dashboard from "./pages/Dashboard"
import Supervisors from './pages/Supervisors';
import Users from './pages/Users';
import Categories from './pages/Categories';
import PendingCourses from './pages/Courses/PendingCourses';
import PublishedCourses from './pages/Courses/PublishedCourses';
import Exams from './pages/Exams';
import Blogs from './pages/Blogs';
import Books from './pages/Books';
import Profile from './pages/Profile';
import Login from './auth/Login';
 

function App() {
 

  return (
    <>
      <Routes>
           <Route path='/' element={<Login/>}>
             <Route index element={<Dashboard/>} />
             <Route path="supervisors" element={<Supervisors />} />
             <Route path="users" element={<Users />} />
             <Route path="categories" element={<Categories />} />
             <Route path="pendingCourses" element={<PendingCourses />} /> 
             <Route path="publishedCourses" element={<PublishedCourses />} /> 
             <Route path="exams" element={<Exams />} /> 
             <Route path="blogs" element={<Blogs />} /> 
             <Route path="books" element={<Books />} /> 
             <Route path="profile" element={<Profile />} /> 
          </Route>
      </Routes>
    </>
  )
}

export default App
