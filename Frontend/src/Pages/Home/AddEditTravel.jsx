import React, { useState } from "react";
import { MdAdd, MdDeleteOutline, MdClose, MdUpdate } from "react-icons/md";
import DateSelector from "../../Components/DateSelector";
import ImageSelector from "../../Components/ImageSelector";
import TagInput from "../../Components/TagInput";
import axiosInstance from "../../axiosInstance";
import {toast} from 'react-toastify'
import moment from "moment";
import UploadImage from "../../UploadImage";
import axios from "axios";

const AddEditTravel = ({ storyInfo, type, onClose, getAllTravelStories }) => {

 const [title, setTitle] = useState(storyInfo?.title || "")
      const [storyImg, setStoryImg] = useState(storyInfo?.imageUrl || null)
      const [story, setStory] = useState(storyInfo?.story || "")
      const [visitedLocation, setVisitedLocation] = useState(storyInfo?.visitedLocation || [])
      const [visitedDate, setVisitedDate] = useState(storyInfo?.visitedDate || null)
  const [error, setError] = useState("")
   
  const addNewTravelStory = async () => {
  try {
    let imageUrl = "";

    if (storyImg) {
      try {
        const imgUpload = await UploadImage(storyImg);
        imageUrl = imgUpload?.imageUrl || "";
      } catch (imgError) {
        console.error("Image upload failed:", imgError);
        toast.error("Image upload failed.");
        return;
      }
    }

    const response = await axiosInstance.post('http://localhost:3000/users/add-travel-story', {
      title,
      story,
      imageUrl : imageUrl || "",
      visitedLocation,
      visitedDate: visitedDate ? moment(visitedDate).valueOf() : moment().valueOf(),
    });

    console.log(response.data.story);

    if (response.data?.story) {
      toast.success("Story Added Successfully!");
      getAllTravelStories();
      onClose();
    }
  } catch (error) {
  
  }
};

 const updateTravelStory = async () => {
  try {
    const storyId = storyInfo._id;

    // Determine image URL
    let imageUrl = storyInfo.imageUrl || "";
    if (typeof storyImg === "object") {
      try {
        const imgUpload = await UploadImage(storyImg);
        imageUrl = imgUpload?.imageUrl || "";
      } catch (imgError) {
        console.error("Image upload failed:", imgError);
        toast.error("Image upload failed.");
        return;
      }
    }

    // Create payload
    const postData = {
      title,
      story,
      imageUrl,
      visitedLocation,
      visitedDate: visitedDate
        ? moment(visitedDate).valueOf()
        : moment().valueOf(),
    };

    // API call to update story
    const response = await axiosInstance.put(
      `http://localhost:3000/users/edit-travel-story/${storyId}`,
      postData
    );

    if (response.data?.story) {
      toast.success("Story Updated Successfully!");
      getAllTravelStories();
      onClose();
    }
  } catch (error) {
    const errMsg =
      error.response?.data?.message || "An unexpected error occurred!";
    setError(errMsg);
  }
};


  const handleAddorUpdateClick = () => {
    console.log("Input data : ", {title, storyImg, story, visitedDate, visitedLocation})

    if(!title){
      setError("please enter a title");
    }

    if(!story){
      setError("Please enter a story");
    }

    setError("")

    if(type==="update"){
      updateTravelStory();
    }
    else{
      addNewTravelStory();
    }
  };

const handleDeleteStoryImage = async () => {
  try {
    const deleteImgRes = await axiosInstance.delete('http://localhost:3000/users/delete-image', {
      params: {
        imageUrl: storyInfo.imageUrl,
      },
    });

    if (deleteImgRes.status === 200) {
      const storyId = storyInfo._id;
       let postData = {
        title,
        story,
        visitedDate: moment().valueOf(),
        visitedLocation,
        imageUrl: "",
      };

      const response = await axiosInstance.put(`http://localhost:3000/users/edit-travel-story/${storyId}`, postData);

      if (response.status === 200) {
        setStoryImg(null);
      }
    }
  } catch (error) {
    const errMsg = error.response?.data?.message || "Image not deleted!";
    setError(errMsg);
  }
};

  const handleRemoveImage = () => {
  setStoryImg(null);
  handleDeleteStoryImage();
};


  return (
  
    <div>
      <div className="flex items-center justify-between">
        <h5 className="text-2xl font-semibold text-slate-700">
          {type == "add" ? "Add Story" : "Update Story"}
        </h5>
        <div className="flex items-center justify-center rounded p-1 px-2">
          <div className="flex justify-between items-center gap-2 font-medium  text-blue-800 ">
            {type == "add" ? (
              <button
                className="btn-small flex items-center justify-around gap-2 bg-blue-100 p-1 rounded px-2 hover:text-blue-100 hover:bg-blue-800 hover:shadow-blue-300"
                onClick={handleAddorUpdateClick}
              >
                <MdAdd className="text-lg " /> ADD STORY
              </button>
            ) : (
              <>
                <button
                  className="btn-small flex items-center justify-around gap-2 bg-blue-100 p-1 rounded px-2 hover:shadow-lg hover:shadow-blue-300"
                  onClick={updateTravelStory}
                >
                  <MdUpdate className="text-lg" /> UPDATE STORY
                </button>

                <button
                  className="btn-small flex items-center justify-around gap-2 bg-red-100 p-1 rounded px-2 hover:shadow-lg hover:shadow-blue-300 text-red-800"
                  onClick={()=>{}}
                >
                  <MdDeleteOutline className="text-lg" /> DELETE
                </button>
              </>
            )}

            <button
              className="btn-small bg-blue-100 p-1 rounded hover:text-white hover:bg-blue-800"
              onClick={onClose}
            >
              <MdClose className="text-xl " />
            </button>
          </div>

          {error && (<p className="text-lg text-red-600 right-2 mt-2">{error}</p>) }
        </div>
      </div>

       <div>
           <div className="flex flex-col gap-2 mt-6">
            <label className="text-md text-slate-400 mb-2" htmlFor="title">TITLE</label>
            <input value={title} onChange={(e)=>setTitle(e.target.value)} className="text-2xl outline-none" type="text" placeholder="A Day at the BEACH" />
           </div>

           <div className="my-5">
             < DateSelector date={visitedDate} setDate={setVisitedDate} />
           </div>
       </div>

       <ImageSelector image={storyImg} setImage = {setStoryImg}  onRemoveImage={handleRemoveImage}/> 
        
        <div className="flex flex-col gap-2 p-2">   
            <label className="text-slate-400 font-medium text-lg" htmlFor="story">STORY</label>
            <textarea
               type="text"
               className="w-2.5xl h-70 p-2 bg-slate-100 outline-none rounded text-md"
               row={10}
               value={story}
               onChange={(e)=>setStory(e.target.value)}

            />
                    
        </div>
          

          <div className="my-3 gap-2">
            <label className="input-label text-slate-400 font-medium text-lg">VISITED LOCATIONS</label>
            <TagInput tags={visitedLocation} setTags = {setVisitedLocation} />
          </div>
     
    </div>
  );
};

export default AddEditTravel;
