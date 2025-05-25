import React, { useEffect, useState } from 'react'
import { useRef } from 'react';
import { FaRegFileImage } from 'react-icons/fa6';
import { MdOutlineDelete } from 'react-icons/md';

const ImageSelector = ({image, setImage,  onRemoveImage}) => {
  const inputRef = useRef(null)
  const [previewUrl, setPreiewUrl] = useState(null);

  const handleImageChange = (e)=>{
    const file = e.target.files[0];
    if(file){
      setImage(file)
    }
  }
  const onChooseFile = ()=>{
    inputRef.current.click();
  }
 
  useEffect(()=>{
        if(typeof image==="string"){
          setPreiewUrl(image);
        }
        else if(image){
          setPreiewUrl(URL.createObjectURL(image));
         
        }
        else{
          setPreiewUrl(null)
        }

        return ()=>{
          if(previewUrl && typeof previewUrl==='string' && !image){
            URL.revokeObjectURL(previewUrl)
           
          }
        }
  }, [image])
  return (
    <div>
       <input
          type='file'
          ref={inputRef}
          onChange={handleImageChange}
          className='hidden'
       />
        {!image ? (<button onClick={()=>onChooseFile()} className='h-[250px] w-full flex flex-col bg-blue-50 rounded items-center justify-center gap-4 mb-2'>
           <div className=''>
             <FaRegFileImage className='text-3xl text-blue-500' />
           </div>
           <p className='text-md text-slate-500'>Browse image files to upload</p>
        </button>) : (
          <div className='w-full relative mb-3 flex'>
            <img 
                src={previewUrl}
                alt='Selected'
                className='w-full h-[400px] rounded-xl object-cover'
            />

            <button className='absolute flex right-5 top-3 p-1 rounded-lg  text-white bg-red-600 hover:bg-white hover:text-red-600' onClick={onRemoveImage}>
              <MdOutlineDelete className='text-2xl ' />
            </button>
          </div>
        )}

    </div>
  )
}

export default ImageSelector