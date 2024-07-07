
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom"

import {
  getFullDetailsOfCourse,
} from "../../../../services/operations/courseDetailsAPI"
import { setCourse, setEditCourse, setStep } from "../../../../slices/courseSlice"
import RenderSteps from "../AddCourse/RenderSteps"

// edit course bhi aaye and uska data bhi bhara aaye edit course me phle se
export default function EditCourse() {
  const dispatch = useDispatch()
  const { courseId } = useParams() // course ki parameter me bheji hai isliye parameter se le rhe hai ye uurl me dekh skte hai ki course ki id aa rhi hai
  const { course } = useSelector((state) => state.course)
  const [loading, setLoading] = useState(false)
  const { token } = useSelector((state) => state.auth)

  useEffect(() => {
     const populateCourseDetails =  async () => {
      setLoading(true)
      const result = await getFullDetailsOfCourse(courseId, token) // ye course ka data nikalne ke liye likhe jo niche course me use kr rhe hai// course ki sari detail yaha mil gyi
      if (result?.courseDetails) {
        
        dispatch(setEditCourse(true))
        dispatch(setCourse(result?.courseDetails))
        //dispatch(setStep(1));
      }
      setLoading(false)
    }
    populateCourseDetails()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])

  if (loading) {
    return (
      <div className="grid flex-1 place-items-center">
        <div className="spinner"></div>
      </div>
    )
  }

  return (
    <div>
      <h1 className="mb-14 text-3xl font-medium text-richblack-5">
        Edit Course
      </h1>

      <div className="mx-auto max-w-[600px]">
        {loading ? (
            <div className="spinner"></div>
          // course me agar data hai to usko show krege
        ) : (

            <RenderSteps /> 
        //   <p className="mt-14 text-center text-3xl font-semibold text-richblack-100">
        //     Course not found
        //   </p> // agar course me data nhi hai
        )}
      </div>
    </div>
 )
}


// import React from 'react'
// import { getFullDetailsOfCourse } from '../../../../services/operations/courseDetailsAPI';
// import { setCourse, setEditCourse, setStep } from '../../../../slices/courseSlice';
// import { useParams } from 'react-router-dom';
// import { useEffect } from 'react';
// import { useState } from 'react';
// import { useSelector } from 'react-redux';
// import { useDispatch } from 'react-redux';
// import RenderSteps from '../AddCourse/RenderSteps';

// const EditCourse = () => {
//     const {token} = useSelector((state) => state.auth);
//     const {course} = useSelector((state) => state.course);
//     const {courseId} = useParams();
//     const [loading, setLoading] = useState(false);
//     const dispatch = useDispatch();


//     useEffect(() => {
//         const popualteCourse = async () => {
//             setLoading(true);
//             const result = await getFullDetailsOfCourse(courseId, token);
//             if(result?.courseDetails) {
//                 dispatch(setCourse(result.courseDetails));
//                 console.log("result",course);
//                 dispatch(setEditCourse(true));
//                 dispatch(setStep(1));
//             }
//             setLoading(false);
//         }
//         popualteCourse();
//     },[]);

//   return (
//     <div className='mx-auto w-11/12 max-w-[1000px] py-10'>
//         <h1 className='mb-14 text-3xl font-medium text-richblack-5'>Edit Course</h1>
//         {
//             loading ? <p>Loading...</p> :(
//         <RenderSteps />
//             )
//         }
//     </div>
//   )
// }

// export default EditCourse