// import React from 'react'

// import {Swiper, SwiperSlide} from "swiper/react"
// import "swiper/css"
// import "swiper/css/free-mode"   // freemode se slider me jo freely slide ho rhe hai
// import "swiper/css/pagination"  // konse page pr hai card
// import { Autoplay,FreeMode,Navigation, Pagination}  from 'swiper'

//import Course_Card from './Course_Card'

import React from 'react'

import {SwiperSlide} from "swiper/react"
import { Swiper } from 'swiper/react';
//import Swiper from 'swiper';
//import { Pagination } from 'swiper/modules';
import "swiper/css"
import "swiper/css/free-mode"
import "swiper/css/pagination"
// import "swiper/css/navigation";
import { Autoplay,FreeMode,Navigation, Pagination, }  from 'swiper/modules'
//import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'
//import "react-loading-skeleton/dist/skeleton.css";

import Course_Card from './Course_Card'

const CourseSlider = ({Courses}) => { // yaha props me courses mile hai
  return (
    <>
      {Courses?.length ? (
        <Swiper
          slidesPerView={1}
          spaceBetween={25}
          loop={true}
          modules={[FreeMode, Pagination]}
          breakpoints={{
            1024: {
              slidesPerView: 3,
            },
          }}
          className="max-h-[30rem]"
        >
          {Courses?.map((course, i) => (
            <SwiperSlide key={i}>
              <Course_Card course={course} Height={"h-[250px]"} />
            </SwiperSlide>
          ))}
        </Swiper>
      ) : (
        <p className="text-xl text-richblack-5">No Course Found</p>
      )}
    </>
  )
}

export default CourseSlider