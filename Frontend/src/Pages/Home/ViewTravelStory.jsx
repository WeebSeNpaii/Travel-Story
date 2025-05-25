import React from "react";
import { GrMapLocation } from "react-icons/gr";
import { MdUpdate, MdDeleteOutline, MdClose } from "react-icons/md";
import moment from "moment";

const ViewTravelStory = ({
  type,
  storyInfo,
  onEditClick,
  onDeleteClick,
  onClose,
}) => {
  return (
    <div>
      <div className="flex items-center justify-end">
        <div className="flex items-center justify-around rounded p-1 px-2">
          <div className="flex justify-between items-center gap-2 font-medium  text-blue-800 ">
            <button
              className="btn-small flex items-center justify-around gap-2 bg-blue-100 p-1 rounded px-2 hover:shadow-lg hover:shadow-blue-300"
              onClick={onEditClick}
            >
              <MdUpdate className="text-lg" /> UPDATE STORY
            </button>

            <button
              className="btn-small flex items-center justify-around gap-2 bg-red-100 p-1 rounded px-2 hover:shadow-lg hover:shadow-blue-300 text-red-800"
              onClick={onDeleteClick}
            >
              <MdDeleteOutline className="text-lg" /> DELETE
            </button>

            <button
              className="btn-small bg-blue-100 p-1 rounded hover:text-white hover:bg-blue-800"
              onClick={onClose}
            >
              <MdClose className="text-xl " />
            </button>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-4 p-2">
        <div className="">
          <h1 className="text-3xl font-medium text-black mt-5">
            {storyInfo && storyInfo.title}
          </h1>
        </div>

        <div className="text-md text-slate-700 font-medium ">
          <span className="">
            {storyInfo && moment(storyInfo.visitedDate).format("DD MMM YYYY")}
          </span>

          <div className="flex justify-end right-2 mb-3 items-center gap-1 p-1 px-2 ">
            <span className=" flex items-center gap-1 p-1 px-2 rounded-md bg-blue-100 text-blue-800">
              <GrMapLocation />
              {storyInfo &&
                storyInfo.visitedLocation.map((item, index) =>
                  storyInfo.visitedLocation.length === index + 1
                    ? `${item}`
                    : `${item}, `
                )}
            </span>
          </div>

          <div className="w-full">
            <img
              className="w-full h-[420px] rounded-lg mb-5 object-cover"
              src={storyInfo && storyInfo.imageUrl}
              alt="selected"
            />
          </div>

          <div>
            <p>{storyInfo && storyInfo.story}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewTravelStory;
