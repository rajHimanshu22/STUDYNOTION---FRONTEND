import React,{useState} from 'react'
import  {HomePageExplore} from "../../../data/homepage-explore"
import HighlightText from './HighlightText';
import CourseCard from './CourseCard';


const tabsName = [
    "Free",
    "New to coding",
    "Most popular",
    "Skills paths",
    "Career paths",
];

const ExploreMore = () => {

    const [currentTab, setCurrentTab] = useState(tabsName[0]); //tabsname[0] by default load hua rhega jb page load hoga -- currenet tab
    const [courses, setCourses] = useState(HomePageExplore[0].courses); // kon kon si courses link rhegi isse -- uss tab me course
    const [currentCard, setCurrentCard] = useState(HomePageExplore[0].courses[0].heading); // current card

    const setMyCards = (value) => { // ye function above 3 jo states bnaye usko update krne ka kaam krega
        setCurrentTab(value);
        const result = HomePageExplore.filter((course) => course.tag === value);
        setCourses(result[0].courses);
        setCurrentCard(result[0].courses[0].heading);
        console.log(result[0].courses);
    };


  return (

    /* update the ui */
    <div>
    {/* Explore more section */}
    <div>
      <div className='text-4xl font-semibold text-center my-10'>
        Unlock the 
        <HighlightText text={"Power of Code"} />

      <p className='text-center text-richblack-300 text-lg text-[16px] mt-3'>
        Learn to build anything you can imagine
      </p>  
      </div>
      </div>

      {/* Tabs Section */}
      <div className='mt-5 flex flex-row rounded-full bg-richblack-800 mb-3 border-richblack-100
      px-1 py-1'>
      {
        tabsName.map( (element, index) => {
            return (
                <div
                className={` text-[13px] lg:text-[16px] flex flex-row items-center gap-2 
                ${currentTab === element 
                ? "bg-richblack-900 text-richblack-5 font-medium"
                : "text-richblack-200" } rounded-full transition-all duration-200 cursor-pointer
                hover:bg-richblack-900 hover:text-richblack-5 text-center px-3 py-1 lg:px-7 lg:py-2`}
                key={index}
                onClick={() => setMyCards(element)}
                >
                    {element}
                </div>
            );
        })
      }

      </div>

      <div className="hidden lg:block lg:h-[200px]"></div>
      {/* <div className='lg:h-[150px]'></div> */}

      {/* course card ka group */}
      
      <div className='lg:absolute gap-9 justify-center mt-5 lg:gap-0 flex lg:justify-between flex-wrap w-full lg:bottom-[0] lg:left-[50%] lg:translate-x-[-50%] lg:translate-y-[50%] text-black lg:mb-0 mb-7 lg:px-0 px-3'>
        {
            courses.map(  (element, index) => {
                return (
                    <CourseCard 
                    key={index}
                    cardData = {element}
                    currentCard = {currentCard}
                    setCurrentCard = {setCurrentCard}
                    />
                )
            } )
        }
      </div>


    </div>
  )
}

export default ExploreMore;
//lg:absolute gap-9 justify-center mt-5 lg:gap-0 flex lg:justify-between flex-wrap w-full lg:bottom-[0] lg:left-[50%] lg:translate-x-[-50%] lg:translate-y-[50%] text-black lg:mb-0 mb-7 lg:px-0 px-3