import React from 'react'
import { MdOutlineClose } from 'react-icons/md'
import moment from 'moment'

const DateRange = ({filterDates, onClear}) => {

    const startDate = filterDates?.from ? moment(filterDates?.from).format("DD MMM YYYY") : "N/A"
    const endDate = filterDates?.to ? moment(filterDates?.to).format("DD MMM YYYY") : "N/A"

  return (
    <div className='flex items-center gap-2 bg-slate-200 px-3 py-2 rounded'>
        <p className='text-md font-semibold'>
            {startDate} - {endDate}
        </p>
        <button onClick={onClear}>
            <MdOutlineClose className='text-lg' />
        </button>
    </div>
  )
}

export default DateRange