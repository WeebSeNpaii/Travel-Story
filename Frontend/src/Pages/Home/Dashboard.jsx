import React from "react";
import Navbar from "../../Components/Navbar";
import axiosInstance from "../../axiosInstance";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { MdAdd } from "react-icons/md";
import Modal from "react-modal";
import TravelStoryCard from "../../cards/TravelStoryCard";
import AddEditTravel from "./AddEditTravel";
import { toast, ToastContainer } from "react-toastify";
import ViewTravelStory from "./ViewTravelStory";
import { DayPicker } from "react-day-picker";
import moment from "moment";
import FilterInfoTitle from "../../cards/FilterInfoTitle";
import EmptyCard from "../../cards/EmptyCard";


const Dashboard = () => {
  const [userInfo, setUserInfo] = useState(null);
  const [allstories, setAllstories] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterType, setFilterType] = useState("");
    const [dateRange, setDateRange] = useState({from:null, to:null});

  const [openAddEditModal, setOpenAddEditModal] = useState({
    isShown: false,
    type: "add",
    data: null,
  });

  const [openViewModal, setOpenViewModal] = useState({
    type: "update",
    isShown: false,
    data: null,
  });

  const navigate = useNavigate();

  const getUserInfo = async () => {
    try {
      const response = await axiosInstance.get("http://localhost:3000/users");

      if (response.data && response.data.user) {
        setUserInfo(response.data.user);
      }
    } catch (error) {
      if (error.response.status === 401) {
        localStorage.clear();
        navigate("/login");
      }
    }
  };

  const getAllstories = async () => {
    try {
      const response = await axiosInstance.get(
        "http://localhost:3000/users/alltravelstories"
      );
      if (response.data.travelstories) {
        setAllstories(response.data.travelstories);
      }
    } catch (error) {
      if (error.response.status === 401) {
        localStorage.clear();
        navigate("/login");
      }
    }
  };

  const handleEdit = (data) => {
    setOpenAddEditModal({ isShown: true, type: "update", data: data });
  };

  const handleViewstory = (data) => {
    setOpenViewModal({
      isShown: true,
      data,
    });
  };

  const deleteTravelStory = async (data) => {
    const storyId = data._id;

    try {
      const response = await axiosInstance.delete(
        `http://localhost:3000/users/delete-travel-story/${storyId}`
      );
      if (response.data && !response.data.error) {
        toast.error("Story deleted Successfully!");
        setOpenViewModal((prevState) => ({ ...prevState, isShown: false }));
        getAllstories();
      }
    } catch (error) {
      if (error.data && error.data.message) {
        toast.error(`${error.data.message}`);
      }
    }
  };

  const onSearchStory = async () => {
    console.log(searchQuery);
    try {
      const response = await axiosInstance.get(
        "http://localhost:3000/users/search",
        {
          params: { searchQuery },
        }
      );

      if (response.data && response.data.stories) {
        setFilterType("search");
        setAllstories(response.data.stories);
      }
    } catch (error) {
      console.log("An unexpected error occurred:", error);
    }
  };

  const handleClearSearch = () => {
    setFilterType("");
    setSearchQuery(""); // Optional: clear the input field as well
    getAllstories();
  };

  const filterStoriesByDate = async (day)=>{
    const startDate = day.from ? moment(day.from).valueOf() : null;
    const endDate = day.to? moment(day.to).valueOf() : null;

    try {
      
    if(startDate && endDate){
      const response = await axiosInstance.get('http://localhost:3000/users/travel-story-filter', {
        params: {
          startDate,
          endDate
        }
      });

      if(response.data && response.data.stories){
        setFilterType("date");
        setAllstories(response.data.stories);
      }
    }
    } catch (error) {
        console.log(error)
    }

  }
 
  const handleDayClick = (day)=>{
          setDateRange(day);
          filterStoriesByDate(day)
  }
 
  const resetFilter = ()=>{
    setDateRange({from: null, to:null});
    setFilterType("")
    getAllstories();
  }


  useEffect(() => {
    getUserInfo();
    getAllstories();
    return () => {};
  }, []);
  return (
    <>
      {userInfo && (
        <Navbar
          userInfo={userInfo}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          onSearchNote={onSearchStory}
          handleClearSearch={handleClearSearch}
        />
      )}

    

      <div className="container mx-30 py-10 ">
        <FilterInfoTitle
            filterType={filterType}
            filterDates={dateRange}
            onClear ={()=>{
              resetFilter();
            }}
        />
        <div className="flex h-full gap-10">
          <div className="flex">
            {allstories.length > 0 ? (
              <div className="grid grid-cols-2 gap-15">
                {allstories.map((item) => (
                  <TravelStoryCard
                    key={item._id}
                    title={item.title}
                    story={item.story}
                    visitedDate={item.visitedDate}
                    visitedLocation={item.visitedLocation}
                    imageUrl={item.imageUrl}
                    onEdit={() => {
                      handleEdit(item);
                    }}
                    onClick={() => {
                      handleViewstory(item);
                    }}
                  />
                ))}
              </div>
            ) : (
              <div><EmptyCard /></div>
            )}
          </div>

          <div className="w-md h-[400px] flex items-center justify-center p-2 bg-white border-slate-600 shadow-lg shadow-slate-300 rounded-lg fixed right-40 ">
            <DayPicker
             captionLayout="dropdown-buttons"
              animate
              mode="range"
              selected={dateRange}
              onSelect={handleDayClick}
             
            />
          </div>
        </div>
      </div>

      <Modal
        isOpen={openAddEditModal.isShown}
        onRequestClose={() => {}}
        style={{
          overlay: {
            backgroundColor: "rgba(0,0,0,0.2)",
            zIndex: 999,
          },
        }}
        appElement={document.getElementById("root")}
        className="modal-box"
      >
        <AddEditTravel
          type={openAddEditModal.type}
          storyInfo={openAddEditModal.data}
          onClose={() => {
            setOpenAddEditModal({ isShown: false, data: null, type: "add" });
          }}
          getAllTravelStories={getAllstories}
        />
      </Modal>

      <Modal
        isOpen={openViewModal.isShown}
        onRequestClose={() => {}}
        style={{
          overlay: {
            backgroundColor: "rgba(0,0,0,0.2)",
            zIndex: 999,
          },
        }}
        appElement={document.getElementById("root")}
        className="modal-box"
      >
        <ViewTravelStory
          type={openViewModal.type}
          storyInfo={openViewModal.data || null}
          onEditClick={() => {
            setOpenViewModal((prevState) => ({ ...prevState, isShown: false }));
            handleEdit(openViewModal.data || null);
          }}
          onDeleteClick={() => {
            deleteTravelStory(openViewModal.data || null);
          }}
          onClose={() => {
            setOpenViewModal((prevState) => ({ ...prevState, isShown: false }));
          }}
        />
      </Modal>

      <button
        className="w-18 h-18 flex items-center justify-center rounded-full bg-blue-700 hover:bg-blue-300 fixed right-20 bottom-10 shadow-md shadow-blue-600"
        onClick={() =>
          setOpenAddEditModal({ isShown: true, type: "add", data: null })
        }
      >
        <MdAdd className="text-[35px] text-white" />
      </button>

      <ToastContainer />
 
    </>
  );
};

export default Dashboard;
