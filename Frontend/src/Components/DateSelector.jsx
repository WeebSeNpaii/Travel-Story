import React from 'react'
import { DayPicker } from "react-day-picker"
import { useState } from 'react';
import { MdOutlineDateRange, MdClose } from 'react-icons/md';
import moment from 'moment';

const DateSelector = ({date, setDate}) => {

     
     const [openDate, setOpenDate] = useState(false)

    
  return (
    <div>
       <div className='flex items-center gap-2 justify-between' >
        <button className='flex items-center gap-2 p-1 px-2 rounded bg-blue-200 text-blue-900 font-semibold my-2' onClick={()=>setOpenDate(true)}>
          <MdOutlineDateRange className='text-lg' /> {date ? moment(date).format("DD MMM YYYY") : moment().format("DD MMM YYYY")}
        </button>

       </div>

        {openDate && <div className='flex justify-between p-5 rounded mt-1 bg-blue-100'>
         
           <div className=''>
        <DayPicker
      mode="single"
      selected={date}
      onSelect={setDate}
     
      
    />
    </div>
    <button className='flex items-start'>
              <MdClose className='text-lg ' onClick={()=>setOpenDate(false)} />
            </button>
     </div>} 
      
    </div>
  
  
   
  )
}

export default DateSelector