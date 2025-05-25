import React, { useState } from 'react'
import Password from '../../Components/password'
import { NavLink, Navigate, useNavigate } from 'react-router-dom'
import axios from 'axios'
import axiosInstance from '../../axiosInstance'


const Signup = () => {
  const [name, setName] = useState()
  const [email, setEmail] = useState()
  const [password, setPassword] = useState()
  const [error, setError] = useState(null)
  const navigate = useNavigate()

  const handleSignup = async (e)=>{
    e.preventDefault();

    if(!name){
      setError("Please Enter your name")
      return;
    }
    if(!email){
       setError("Please Enter a valid email")
       return;
    }

    if(!password){
      setError("Please enter a correct password")
      return;
    }
     
    try {
      const response = await axiosInstance.post("http://localhost:3000/auth/signup", {

        fullName: name,
        email: email, 
        password: password,

      })

      if(response.data && response.data.accesstoken){
        localStorage.setItem("token", response.data.accesstoken);
        navigate('/login')
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
    <div className='h-screen bg-blue-200 overflow-hidden relative'>
      <div className='h-screen flex justify-center items-center '>
        <div className='bg-[url(./src/assets/signupimage.jpeg)] h-[85vh] rounded-xl flex flex-col justify-end p-10 w-2xl'>
          <h4 className='text-6xl text-white font-semibold leading-none mb-4 '>Join the <br /> Adventure</h4>
          <p className='text-white text-md'>Create an account to start documenting your travel and preserving your memories in your travel journel. </p>
        </div>
        <div className='w-2xl h-[70vh] p-5 bg-white rounded-xl flex items-center shadow-md shadow-green-100'>
          <form onSubmit={handleSignup} className='px-20'>
            <h4 className='font-bold text-4xl text-black m-4 mb-6'>Signup</h4>
             <input  onChange={(e)=>setName(e.target.value)} className='w-md bg-slate-200 p-3 px-4 rounded-md m-3' placeholder='Name' type='text' />
            <input onChange={(e)=>setEmail(e.target.value)} className='w-md bg-slate-200 p-3 px-4 rounded-md m-3' placeholder='Email' type='email' />
             <Password onChange={(e)=>setPassword(e.target.value) } />
              {error && <p className='text-red-700 text-sm ml-3'>{error}</p> }
             <button type='submit' className='w-md font-bold text-white bg-blue-600 rounded-full m-3 p-2 px-4 shadow-lg shadow-blue-500 hover:text-blue-800 hover:bg-blue-200'>CREATE ACCOUNT</button>
              
         
            <div className='flex justify-center'> <p className='text-md text-gray-800 mr-5'>Or</p></div>
            <NavLink to='/login'> <button type='submit' className='w-md font-bold text-blue-600 bg-blue-100 rounded-full shadow-lg shadow-blue-500 m-3 p-2 px-4 hover:text-white hover:bg-blue-600'>LOGIN</button></NavLink>
            
         
            
          </form>
        </div>
      </div>
    </div>
  )
}

export default Signup