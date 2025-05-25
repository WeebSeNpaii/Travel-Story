import React from 'react'
import { useNavigate } from 'react-router-dom'
import { FaUserCircle } from "react-icons/fa";



const ProfileInfo = ({userInfo}) => {
    const navigate = useNavigate();
    const handleLogout = ()=>{
        localStorage.clear()
        navigate('/login')
    }
  return (
    <>
        
        <div className='flex items-center gap-5 cursor-pointer'>
            <FaUserCircle className='text-5xl hover:text-white hover:bg-black rounded-full' />
           <div className="p-1 mr-8 flex flex-col items-center justify-center gap-1">
                 <p className="text-xl font-semibold text-black hover:text-gray-600">{userInfo.fullName}</p>
                  <button onClick={handleLogout}  className="text-md underline hover:text-blue-700">Logout</button>
            </div>
         
        </div>
    
          
         </>
  )
}

export default ProfileInfo