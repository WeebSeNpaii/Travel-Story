import React from 'react'
import {FaRegEye, FaRegEyeSlash} from 'react-icons/fa6'
import { useState } from 'react'


const Password = ({value, onChange, placeholder}) => {

    const [isShowpassword, setIsShowpassword] = useState(false);

    const togglepassword = ()=>{
        setIsShowpassword(!isShowpassword);
    }

  return (
    <div className='flex items-center mb-3'>
        <input
       
        type={isShowpassword? "text" : "password"}
        onChange={onChange}
        placeholder={placeholder || "password"}
        className='w-md bg-slate-200 p-3 px-4 rounded-md m-3 mb-4'   
        />
        <div className='mb-3'>
            {
            isShowpassword ? 
            (<FaRegEye
                size={24}
                className='cursor-pointer text-black'
                onClick={()=>togglepassword()} />): (<FaRegEyeSlash 
                size={24}
                className='text-gray-500 cursor-pointer'
                onClick={()=>togglepassword()}/>)
        }
      
        </div>
         
    </div>
  )
}

export default Password