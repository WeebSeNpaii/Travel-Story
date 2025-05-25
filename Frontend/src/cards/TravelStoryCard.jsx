import React from 'react'
import moment from 'moment/moment'
import {GrMapLocation} from 'react-icons/gr'


const TravelStoryCard = ({
  imageUrl,
  title,
  story,
  visitedDate,
  visitedLocation,
  onClick
}) => {
  return (
    <div  className='w-lg shadow-md shadow-slate-400 rounded-lg hover:shadow-lg hover:shadow-slate-600 ease-in-out'>
      <img onClick={onClick} src={imageUrl} alt={title} className='w-lg h-60 object-cover rounded-lg' />

      <div className='p-4'>
         <h6 className='font-semibold text-xl'>{title}</h6>
      <span className='text-gray-500 py-1 text-sm'>{visitedDate ? moment(visitedDate).format("DD MMM YYYY"): "-"}</span>
      <p className='py-1 text-slate-700 text-md font-small mt-1'>{story.slice(0,60)}</p>

      <div className='inline-flex items-center gap-2 rounded bg-cyan-200/40  mt-1 p-1.5 text-[15px] text-cyan-600'>
       
           <GrMapLocation className='text-sm' />
       
           {visitedLocation.map((item, index)=>
        visitedLocation.length==index + 1? `${item}` : `${item}, `      
      )}
       
       
        
     
      </div>
      </div>

     
      

    </div>
  )
}

export default TravelStoryCard