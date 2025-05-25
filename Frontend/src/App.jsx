import React from 'react'
import {BrowserRouter, Routes, Route, Navigate, useNavigate} from 'react-router-dom'
import Dashboard from './Pages/Home/Dashboard'
import Signup from './Pages/Auth/Signup'
import Login from './Pages/Auth/login'



const App = () => {
  return (
    <>
    <BrowserRouter>
     <Routes>
          <Route path='/' element={<Root />} />  
          <Route path='/dashboard' element={<Dashboard />} />
          <Route path='/signup' element={<Signup />} />
          <Route path='/login' element={<Login />} />

     </Routes>
    
    
    </BrowserRouter>
    </>
    
  )
}
const Root = ()=>{
  const isAuthenticated = localStorage.getItem("token")
 
   return isAuthenticated ? (<Navigate to='/dashboard' />): (<Navigate to='/login' />)
  
}
export default App