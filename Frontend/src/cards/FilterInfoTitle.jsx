import React from 'react'
import DateRange from './DateRange'

const FilterInfoTitle = ({filterType, filterDates, onClear}) => {
  return (
    filterType && (
              <div className='mb-5 w-auto'>
       {filterType==="search"?
       (
        <h3 className='text-2xl font-medium'>Search Results</h3>
       ): (
        <div className='w-auto flex items-center gap-2'>
            <h3 className='text-xl font-medium'>Travel Stories from</h3>
            <DateRange filterDates={filterDates} onClear={onClear}/>

        </div>
       )
    }

    </div>
    
    )
   
   
  )
}

export default FilterInfoTitle