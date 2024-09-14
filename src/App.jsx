import Layout from './Layout'
import './App.css'
import { Route, Routes } from 'react-router-dom';
import Dashboard from "./pages/Dashboard"
import Supervisors from './pages/Supervisors';
import Users from './pages/Users';
import Categories from './pages/Categories';
import PendingCourses from './pages/Courses/PendingCourses';

function App() {
 

  return (
    <>
      <Routes>
          <Route path='/' element={<Layout/>}>
             <Route index element={<Dashboard/>} />
             <Route path="supervisors" element={<Supervisors />} />
             <Route path="users" element={<Users />} />
             <Route path="categories" element={<Categories />} />
             <Route path="pendingCourses" element={<PendingCourses />} /> 
          </Route>
      </Routes>
    </>
  )
}

export default App
