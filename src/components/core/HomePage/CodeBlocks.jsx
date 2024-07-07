import React from "react";
import CTAButton from "../HomePage/Button";
import HighlightText from "../HomePage/HighlightText";
import { FaArrowRight } from "react-icons/fa";
import { TypeAnimation } from "react-type-animation";

const CodeBlocks = ({
    position, heading, subheading, ctabtn1, ctabtn2, codeblock, backgroundGradient, codeColor
}) => {
  return (
    <div className={`flex ${position} my-20 justify-between gap-10 flex-col `}> {/* home me lg ka likh diye isliye yaha jo flex col likhe wo khud se small screen ke liye ho jayega */}
      
    {/*Section 1*/}
    <div className=' flex flex-col gap-8 w-[100%] lg:w-[50%] p-4'>
        {heading}
        {/* Sub Heading */}
        <div className='text-richblack-300 font-bold text-base p-4 md:text-lg w-[85%] -mt-3'>
            {subheading}
        </div>

        {/* Button Group */}
        <div className='flex gap-7 mt-7 p-3'>
            <CTAButton active={ctabtn1.active} linkto={ctabtn1.linkto}>   {/* ctaButton  component */}
                <div className='flex gap-2 items-center'>
                    {ctabtn1.btnText}
                    <FaArrowRight/>
                </div>
            </CTAButton>

            <CTAButton active={ctabtn2.active} linkto={ctabtn2.linkto}>  
                    {ctabtn2.btnText}
            </CTAButton>
        </div>

    </div>
    
    {/*Section 2*/}
    {/* HW -> BG gradient */}

    <div className="h-fit code-border flex flex-row py-3 text-[10px] sm:text-sm leading-[18px] sm:leading-6 relative w-[100%] lg:w-[470px]">
        {backgroundGradient}
        {/* Indexing */}
        <div className="text-center flex flex-col w-[10%] select-none text-richblack-400 font-inter font-bold ">
          <p>1</p>
          <p>2</p>
          <p>3</p>
          <p>4</p>
          <p>5</p>
          <p>6</p>
          <p>7</p>
          <p>8</p>
          <p>9</p>
          <p>10</p>
          <p>11</p>
        </div>

        {/* Codes */}
        <div
          className={`w-[90%] flex flex-col gap-2 font-bold font-mono ${codeColor} pr-1`}
        >
          <TypeAnimation
            sequence={[codeblock, 1000, ""]}  // likhna hai codeblock and 10000 means take 10 sec pause again repeat
            cursor={true}
            repeat={Infinity} //infinity baar chalega
            style={{
              whiteSpace: "pre-line",
              display: "block",
            }}
            omitDeletionAnimation={true}
          />
        </div>
      </div>

    </div>
    
    );
};

    export default CodeBlocks;