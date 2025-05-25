import React, { useState } from 'react'
import Password from '../../Components/password'
import { NavLink, Navigate, useNavigate } from 'react-router-dom'
import axios from 'axios'
import axiosInstance from '../../axiosInstance'


const Login = () => {
  const [email, setEmail] = useState()
  const [password, setPassword] = useState()
  const [error, setError] = useState(null)
  const navigate = useNavigate()

  const handleLogin = async (e)=>{
    e.preventDefault();

    if(!email){
       setError("Please Enter a valid email")
       return;
    }

    if(!password){
      setError("Please enter a correct password")
      return;
    }
     
    try {
      const response = await axiosInstance.post("http://localhost:3000/auth/login", {
        email: email, password: password
      })

      if(response.data && response.data.accesstoken){
        localStorage.setItem("token", response.data.accesstoken);
        navigate('/Dashboard')
      }
    } catch (error) {
      if(error.response && error.response.data && error.response.data.message){
        setError(error.response.data.message)
      }
      else{
        setError("An unexpected error occured, please try again later")
      }
      
    }

  }
  return (
    <div className='h-screen bg-green-100 overflow-hidden relative'>
      <div className='h-screen flex justify-center items-center '>
        <div className='bg-[url(./src/assets/loginimage.jpeg)] h-[85vh] rounded-xl flex flex-col justify-end p-10 w-2xl'>
          <h4 className='text-5xl text-white font-semibold leading-none mb-4 '>Capture Your <br /> Journeys</h4>
          <p className='text-white text-md'>Record your travel experiences and memories in your personal travel journal</p>
        </div>
        <div className='w-2xl h-[70vh] p-5 bg-white rounded-xl flex items-center shadow-md shadow-green-100'>
          <form onSubmit={handleLogin} className='px-20'>
            <h4 className='font-bold text-4xl text-black m-4 mb-6'>Login</h4>
            <input  onChange={(e)=>setEmail(e.target.value)} className='w-md bg-slate-200 p-3 px-4 rounded-md m-3' placeholder='Email' type='email' />
             <Password  onChange={(e)=>setPassword(e.target.value) } />
              {error && <p className='text-red-700 text-sm ml-3'>{error}</p> }
               <button type='submit' className='w-md font-bold text-white bg-green-600 rounded-full m-3 p-2 px-4 shadow-md shadow-green-300 hover:text-green-800 hover:bg-green-200'>LOGIN</button>
         
            <div className='flex justify-center'> <p className='text-md text-gray-800 mr-5'>Or</p></div>
            <NavLink to='/signup'> <button type='submit' className='w-md font-bold text-green-700 bg-green-100 rounded-full m-3 p-2 px-4 shadow-md shadow-green-300 hover:text-white hover:bg-green-600'>CREATE ACCOUNT</button></NavLink>
            
         
            
          </form>
        </div>
      </div>
    </div>
  )
}

export default Login