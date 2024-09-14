import Layout from './Layout'
import './App.css'
import { Route, Routes } from 'react-router-dom';
import Dashboard from "../"

function App() {
 

  return (
    <>
      <Routes>
          <Route path='/' element={<Layout/>}>
             <Route index element={<Dashboard/>} />
          </Route>
      </Routes>
    </>
  )
}

export default App
