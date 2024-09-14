import Layout from './Layout'
import './App.css'
import { Route, Routes } from 'react-router-dom';
import Dashboard from "./pages/Dashboard"
import Supervisors from './pages/Supervisors';

function App() {
 

  return (
    <>
      <Routes>
          <Route path='/' element={<Layout/>}>
             <Route index element={<Dashboard/>} />
             <Route path="supervisors" element={<Supervisors />} />
          </Route>
      </Routes>
    </>
  )
}

export default App
