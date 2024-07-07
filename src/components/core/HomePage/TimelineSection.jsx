import React from "react";

import Logo1 from "../../../assets/TimeLineLogo/Logo1.svg";
import Logo2 from "../../../assets/TimeLineLogo/Logo2.svg";
import Logo3 from "../../../assets/TimeLineLogo/Logo3.svg";
import Logo4 from "../../../assets/TimeLineLogo/Logo4.svg";
import timelineImage from "../../../assets/Images/TimelineImage.png";

const timeline = [
  {
    Logo: Logo1,
    Heading: "Leadership",
    Description: "Fully committed to the success company",
  },
  {
    Logo: Logo2,
    Heading: "Responsibility",
    Description: "Students will always be our top priority",
  },
  {
    Logo: Logo3,
    Heading: "Flexibility",
    Description: "The ability to switch is an important skills",
  },
  {
    Logo: Logo4,
    Heading: "Solve the problem",
    Description: "Code your way to a solution",
  },
];

const TimelineSection = () => {
  return (
    <div>
      <div className="flex flex-col lg:flex-row gap-15 mb-20 items-center">
        <div className="lg:w-[45%] flex flex-col gap-5 p-3 lg:p-0">
          {timeline.map((element, index) => {
            return (
              <div className="flex flex-col gap-3" key={index}>
                <div className="flex gap-6" key={index}>
                <div className="w-[50px] h-[50px] bg-white flex rounded-full items-center justify-center shadow-[#00000012] shadow-[0_0_62px_0]">
                  <img src={element.Logo} alt=""/>
                </div>

                <div>
                  <h2 className="font-semibold text-[18px]">
                    {element.Heading}
                  </h2>
                  <p className="text-base">{element.Description}</p>
                </div>
                </div>
                <div
                  className={`hidden ${
                    timeline.length - 1 === index ? "hidden" : "lg:block"
                  }  h-14 border-dotted border-r border-richblack-100 bg-richblack-400/0 w-[26px]`}
                ></div>
              </div>
            );
          })}
        </div>
        <div className="relative w-fit h-fit shadow-blue-200 shadow-[0px_0px_30px_0px]">
          <img
            src={timelineImage}
            alt="timelineImage"
            className="shadow-white object-cover lg:h-fit"
          />

          <div
            className="absolute bg-caribbeangreen-700 flex flex-row text-white uppercase py-7
                            left-[50%] translate-x-[-50%] translate-y-[-50%]"
          >
            <div className="flex flex-row gap-5 items-center border-r border-caribbeangreen-300 px-7">
              <p className="text-3xl font-bold">10</p>
              <p className="text-caribbeangreen-300 text-sm">
                Years of Experience
              </p>
            </div>

            <div className="flex gap-5 items-center px-7">
              <p className="text-3xl font-bold">250</p>
              <p className="text-caribbeangreen-300 text-sm">TYpe of Courses</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TimelineSection;

//jisko relative bnaye uspr overlap krwayege
//h1 tag baar baar use nhi krna chahiye(galat nhi hai) isliye <p> use liye
