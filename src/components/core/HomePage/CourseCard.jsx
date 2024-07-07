import React from "react";

// Importing React Icons
import { HiUsers } from "react-icons/hi";
import { ImTree } from "react-icons/im";

const CourseCard = ({cardData, currentCard, setCurrentCard}) => {
  return (
    <div
      className={`w-[360px] lg:w-[30%] ${
        currentCard === cardData?.heading
          ? "bg-white shadow-[12px_12px_0_0] shadow-yellow-50"
          : "bg-richblack-800"
      }  text-richblack-25  box-border cursor-pointer`}
      onClick={() => setCurrentCard(cardData?.heading)}
    >
      <div className="border-b-[2px] border-richblack-400 border-dashed h-[80%] p-6 flex flex-col gap-3">
        <div
          className={` ${
            currentCard === cardData?.heading && "text-richblack-800"
          } font-semibold text-[20px]`}
        >
          {cardData?.heading}
        </div>

        <div className="text-richblack-400">{cardData?.description}</div>
      </div>

      <div
        className={`flex justify-between ${
          currentCard === cardData?.heading ? "text-blue-300" : "text-richblack-300"
        } px-6 py-3 font-medium `}
      >
        {/* Level */}
        <div className="flex items-center gap-2 text-[16px]">
          <HiUsers />
          <p>{cardData?.level}</p>
        </div>

        {/* Flow Chart */}
        <div className="flex items-center gap-2 text-[16px] p-3">
          <ImTree />
          <p>{cardData?.lessionNumber} Lession</p>
        </div>
      </div>
    </div>
  );
};

export default CourseCard;



// const CourseCard = ({cardData,currentCard,setCurrentCard}) => {

//     return (
//       <div>
        
//       <button className={`flex flex-col  w-[360px] p-5 gap-1  ${currentCard===cardData.heading? "bg-white text-richblack-700 shadow-[12px_12px_0px] shadow-[#FFD60A]":"bg-richblack-700 text-richblue-100"}`} onClick={()=>{setCurrentCard(cardData.heading)}}>
  
//   <div className=' flex flex-col text-center p-2 border-b-2 border-richblack-100 border-dashed'>
//     <p className={` text-xl font-bold text-left mb-2 ${currentCard===cardData.heading?"text-black":"text-richblue-5 "}`}>
//       {cardData.heading}
//     </p>
//     <p className=" text-left mb-6 text-base ">
//       {cardData.description}
//     </p>
//   </div>
//   <div className=' flex justify-between w-full p-3'>
//     <p>{cardData.level}</p>
//     <p>{cardData.lessionNumber} Lessons</p>
//     </div>
//   </button>
//       </div>
  
//     )
//   }
  
//   export default CourseCard;