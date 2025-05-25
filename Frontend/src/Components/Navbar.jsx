import React from "react";
import {useNavigate } from "react-router-dom"
import ProfileInfo from "../cards/ProfileInfo";
import SearchBar from "./searchBar";

const Navbar = ({userInfo, searchQuery, setSearchQuery, onSearchNote, handleClearSearch}) => {

 
const handleSearch = ()=>{
  if(searchQuery){
    onSearchNote(searchQuery)
  }
}
const onClearSearch = ()=>{
  handleClearSearch();
  setSearchQuery("")
}
  return (
    <> 
     
   
     <div className='h-[10vh] flex justify-between p-3 pl-6 items-center shadow-sm shadow-gray-400 top-0 sticky bg-white'>
      <div>
         <p id="logo" className='text-blue-800 font-bold font-stretch-75% text-4xl p-2'>Travel Story</p>
      </div>

      <SearchBar 
        value={searchQuery}
        onChange={(e)=>
          setSearchQuery(e.target.value)
        }
        handleSearch={handleSearch}
        onClearSearch={onClearSearch}
      
      />
        
       <ProfileInfo userInfo={userInfo} />
    </div>
    
    </>

    
    
  )
}

export default Navbar