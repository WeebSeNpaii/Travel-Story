import React from 'react'
import { SlNotebook } from "react-icons/sl";

const EmptyCard = () => {
  return (
    <div className='w-4xl h-[500px] flex flex-col items-center justify-center bg-white gap-6'>
             <span className='p-4 rounded-full bg-blue-600 shadow-md shadow-blue-700'>
                 <SlNotebook className='text-5xl text-white ' />
    
             </span>
           
         
        <p className='text-lg'>Start creating your first travel story! Click the add button to jot
            <br />
            down your thoughts, ideas and memories. Let's get started!
        </p>
    </div>
  )
}

export default EmptyCard