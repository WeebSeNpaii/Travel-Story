import React, {useEffect,  useState } from 'react'
import { GrMapLocation } from 'react-icons/gr'
import { MdAdd, MdClose } from 'react-icons/md'


const TagInput = ({tags, setTags}) => {
    const [inputValue, setInputValue] = useState([])

    const addnewTag = ()=>{
        if(inputValue.trim() !== ""){
            setTags([...tags, inputValue.trim()]);
              setInputValue("")
          
        }
    }

    const handleKeydown = (e)=>{
         if(e.key==="Enter"){
            addnewTag();
          
         }
    }

    
         const RemoveTags = (tagtoRemove)=>{
      
             setTags(tags.filter((tag)=> tag!==tagtoRemove))
    
        
 
 
}
 
   
 
  return (
    
    <div>
      
       {tags.length>0 && (
        
                <div className='flex gap-2 p-2 items-center my-2'>
                     {tags.map((tag, index)=>(
                        <span key={index} className='flex items-center p-1 px-2 text-md bg-blue-100 text-blue-700 rounded-lg gap-2'>
                            <GrMapLocation /> {tag}
                            <button onClick={()=>RemoveTags(tag)}>
                                <MdClose className='text-lg hover:text-black' />
                            </button>
                        </span>
                     ))}
        
        
                </div>
        
        
        
               )}
       
        
        
       
        <div className='mt-4 flex gap-3'>
            <input type='text'
               value={inputValue}
               onChange={(e)=>setInputValue(e.target.value)}
               className='p-1 text-lg border-1 border-blue-400 rounded-lg text-blue-700 font-medium outline-none px-2 shadow-md shadow-blue-200'
               placeholder='Add Location'
               onKeyDown={handleKeydown}
            
            />
            <button className='p-1 rounded-lg border-1 border-blue-600 text-blue-600 bg-white hover:bg-blue-600 hover:text-white shadow-md shadow-blue-200' onClick={addnewTag}>
                <MdAdd className='text-2xl' />
            </button>
        </div>
    </div>
  )
}

export default TagInput