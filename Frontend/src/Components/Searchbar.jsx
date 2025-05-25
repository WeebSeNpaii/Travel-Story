import React, { useEffect } from 'react'
import { FaMagnifyingGlass } from 'react-icons/fa6'
import {IoMdClose} from 'react-icons/io'

const SearchBar = ({value, onChange, onClearSearch, handleSearch}) => {
  
    const handlekeySearch = (e)=>{
          if(e.key==="Enter"){
              handleSearch();
          }
    }
  return (
    <div className='w-100 flex items-center px-5 bg-slate-200 rounded-md gap-4'>
        <input 
          type='text'
          placeholder='Search Notes'
          value={value}
          onChange={onChange}
          className='w-full text-sm bg-transparent py-[11px] outline-none'
          onKeyDown={handlekeySearch}
        
        />

        {value && <IoMdClose className='text-2xl text-slate-500 hover:text-black' onClick={onClearSearch}/>
           
        }
        
        <FaMagnifyingGlass className='text-lg text-slate-500 hover:text-black' onClick={handleSearch} />
    </div>
  )
}

export default SearchBar