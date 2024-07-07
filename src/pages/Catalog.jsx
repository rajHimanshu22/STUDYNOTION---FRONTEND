import React from 'react'
import { useParams } from 'react-router'
import { useState } from 'react';
import { categories } from '../services/apis';
import { apiConnector } from '../services/apiconnector';
import { useEffect } from 'react';
import CourseSlider from '../components/core/Catalog/CourseSlider';
import { getCatalogaPageData } from '../services/operations/pageAndComponentData';
import CatalogCard from '../components/core/Catalog/Course_Card';
import { useDispatch } from 'react-redux';

const Catalog = () => {

  const Catalog = useParams();
  const { catalogName } = useParams()
  const [Desc, setDesc] = useState([]);
  const [CatalogPageData, setCatalogPageData] = useState(null);
  const [categoryID, setcategoryID] = useState(null);
  const [activeOption, setActiveOption] = useState(1);
  const dispatch = useDispatch();


  const fetchSublinks=  async ()=>{
    try {
        const result = await apiConnector("GET",categories.CATEGORIES_API);
        const category_id= result.data.data.filter((ct) => ct.name.split(" ").join("-").toLowerCase() === catalogName)[0]._id;
        setcategoryID(category_id);      
        setDesc(result.data.data.filter((item)=>item.name=== catalogName)[0]);
        // console.log("Desc",Desc);  
        // console.log(category_id);
    } catch (error) {
        console.log("could not fetch sublinks");
        console.log(error);
    }
}
useEffect(() => {
    fetchSublinks();
}, [Catalog])

useEffect(() => {
    const fetchCatalogPageData = async () => {
        
            const result = await getCatalogaPageData(categoryID,dispatch);
            setCatalogPageData(result);
            // console.log("page data",CatalogPageData);
        
    }
    if (categoryID) {
        fetchCatalogPageData();
    }
}, [categoryID])


  return (
    <div>
      <div className=' box-content bg-richblack-800 px-4'>
      <div className='mx-auto flex min-h-[260px]  flex-col justify-center gap-4 '>
        <p className='text-sm text-richblack-300'>Home / Catalog / <span className='text-yellow-25'>{catalogName}</span> </p>
        <p className='text-3xl text-richblack-5'>{catalogName}</p>
        <p className='max-w-[870px] text-richblack-200'>
        {Desc?.description}
        </p>
      </div>
      </div>

      <div className=" mx-auto box-content w-full max-w-maxContentTab px-4 py-12 lg:max-w-maxContent">
            <div className="section_heading">Courses to get you started</div>
            <div className="my-4 flex border-b border-b-richblack-600 text-sm">
        
        <div className='my-4 flex border-b border-b-richblack-600 text-sm'>
          <button onClick={()=>{setActiveOption(1)}}  className={activeOption===1? `px-4 py-2 border-b border-b-yellow-25 text-yellow-25 cursor-pointer`:`px-4 py-2 text-richblack-50 cursor-pointer` }>Most Populer</button>
          <button onClick={()=>{setActiveOption(2)}} className={activeOption===1?'px-4 py-2 text-richblack-50 cursor-pointer':'px-4 py-2 border-b border-b-yellow-25 text-yellow-25 cursor-pointer'}>New</button>
        </div></div>
        <CourseSlider Courses={CatalogPageData?.selectedCourses}/>        
      </div>

      <div className=' mx-auto box-content w-full max-w-maxContentTab px-4 py-12 lg:max-w-maxContent'>
        <h2 className='section_heading mb-6 md:text-3xl text-xl'>
          Similar to {catalogName}
        </h2>
        <CourseSlider Courses={CatalogPageData?.differentCourses}/>
      </div>
      
      <div className=' mx-auto box-content w-full max-w-maxContentTab px-2 py-12 lg:max-w-maxContent'>
        <h2 className='section_heading mb-6 md:text-3xl text-xl'>
          Frequently Bought Together
          </h2>
          <div className='grid grid-cols-2 gap-3 lg:gap-6 lg:grid-cols-2 pr-4'>
            {
              CatalogPageData?.mostSellingCourses?.map((item,index)=>(
                <CatalogCard key={index} course={item} Height={"h-[100px] lg:h-[400px]"} />
              ))
            }
          </div>
      </div>

    </div>
  )
}

export default Catalog



// import React, { useEffect, useState } from 'react'
// import Footer from '../components/common/Footer'
// import { useParams } from 'react-router-dom'
// import { apiConnector } from '../services/apiconnector';
// import { categories } from '../services/apis';
// import { getCatalogaPageData } from '../services/operations/pageAndComponentData';
// import Course_Card from '../components/core/Catalog/Course_Card';
// import CourseSlider from '../components/core/Catalog/CourseSlider';
// import { useSelector } from "react-redux"
// import Error from "./Error"

// const Catalog = () => {

//     const { loading } = useSelector((state) => state.profile)
//   const { catalogName } = useParams()
//   const [active, setActive] = useState(1)
//     const [catalogPageData, setCatalogPageData] = useState(null);
//     const [categoryId, setCategoryId] = useState("");

//     //Fetch all categories
//     useEffect(()=> {
//         const getCategories = async() => {
//             const res = await apiConnector("GET", categories.CATEGORIES_API);
//             const category_id = 
//             res?.data?.data?.filter((ct) => ct.name.split(" ").join("-").toLowerCase() === catalogName)[0]._id;
//             setCategoryId(category_id);
//         }
//         getCategories();
//     },[catalogName]);

//     useEffect(() => {
//         const getCategoryDetails = async() => {
//             try{
//                 const res = await getCatalogaPageData(categoryId);
//                 console.log("PRinting res: ", res);
//                 setCatalogPageData(res);
//             }
//             catch(error) {
//                 console.log(error)
//             }
//         }
//         if(categoryId) {
//             getCategoryDetails();
//         }
        
//     },[categoryId]);


//     if (loading || !catalogPageData) {
//         return (
//           <div className="grid min-h-[calc(100vh-3.5rem)] place-items-center">
//             <div className="spinner"></div>
//           </div>
//         )
//       }
//       if (!loading && !catalogPageData.success) {
//         return <Error />
//       }
    
//       return (
//         <>
//           {/* Hero Section */}
//           <div className=" box-content bg-richblack-800 px-4">
//             <div className="mx-auto flex min-h-[260px] max-w-maxContentTab flex-col justify-center gap-4 lg:max-w-maxContent ">
//               <p className="text-sm text-richblack-300">
//                 {`Home / Catalog / `}
//                 <span className="text-yellow-25">
//                   {catalogPageData?.data?.selectedCourses?.courseName}
//                 </span>
//               </p>
//               <p className="text-3xl text-richblack-5">
//                 {catalogPageData?.data?.selectedCategory?.name}
//               </p>
//               <p className="max-w-[870px] text-richblack-200">
//                 {catalogPageData?.data?.selectedCategory?.description}
//               </p>
//             </div>
//           </div>
    
//           {/* Section 1 */}
//           <div className=" mx-auto box-content w-full max-w-maxContentTab px-4 py-12 lg:max-w-maxContent">
//             <div className="section_heading">Courses to get you started</div>
//             <div className="my-4 flex border-b border-b-richblack-600 text-sm">
//               <p
//                 className={`px-4 py-2 ${
//                   active === 1
//                     ? "border-b border-b-yellow-25 text-yellow-25"
//                     : "text-richblack-50"
//                 } cursor-pointer`}
//                 onClick={() => setActive(1)}
//               >
//                 Most Populer
//               </p>
//               <p
//                 className={`px-4 py-2 ${
//                   active === 2
//                     ? "border-b border-b-yellow-25 text-yellow-25"
//                     : "text-richblack-50"
//                 } cursor-pointer`}
//                 onClick={() => setActive(2)}
//               >
//                 New
//               </p>
//             </div>
//             <div>
//               <CourseSlider
//                 Courses={catalogPageData?.data?.selectedCategory?.courses}
//               />
//             </div>
//           </div>
//           {/* Section 2 */}
//           <div className=" mx-auto box-content w-full max-w-maxContentTab px-4 py-12 lg:max-w-maxContent">
//             <div className="section_heading">
//               Top courses in {catalogPageData?.data?.differentCategory?.name}
//             </div>
//             <div className="py-8">
//               <CourseSlider
//                 Courses={catalogPageData?.data?.differentCategory?.courses}
//               />
//             </div>
//           </div>
    
//           {/* Section 3 */}
//           <div className=" mx-auto box-content w-full max-w-maxContentTab px-4 py-12 lg:max-w-maxContent">
//             <div className="section_heading">Frequently Bought</div>
//             <div className="py-8">
//               <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
//                 {catalogPageData?.data?.mostSellingCourses
//                   ?.slice(0, 4)
//                   .map((course, i) => (
//                     <Course_Card course={course} key={i} Height={"h-[400px]"} />
//                   ))}
//               </div>
//             </div>
//           </div>
    
//           <Footer />
//         </>
//       )
//     }
    
//     export default Catalog


// import React, { useEffect, useState } from 'react'
// import Footer from '../components/common/Footer'
// import { useParams } from 'react-router-dom'
// import { apiConnector } from '../services/apiconnector';
// import { categories } from '../services/apis';
// import { getCatalogaPageData } from '../services/operations/pageAndComponentData';
// import Course_Card from '../components/core/Catalog/Course_Card';
// import CourseSlider from '../components/core/Catalog/CourseSlider';
// import { useSelector } from "react-redux"
// import Error from "./Error"

// const Catalog = () => {

//     const { loading } = useSelector((state) => state.profile)
//   const { catalogName } = useParams() // because ye parameter url me aa rhi hai
//   const [active, setActive] = useState(1)
//     const [catalogPageData, setCatalogPageData] = useState(null);
//     const [categoryId, setCategoryId] = useState("null"); // konse category pr click kiya catalogue me
//     const dispatch = dispatch();

//     //Fetch all categories - sare category mil jaye
//     useEffect(()=> {
//       // isse basically category id nikalne ke liye use kr lege
//         const getCategories = async() => {
//             const res = await apiConnector("GET", categories.CATEGORIES_API);
//             const category_id = 
//             res?.data?.data?.filter((ct) => ct.name.split(" ").join("-").toLowerCase() === catalogName)[0]._id; // isse url me category jiske name space hai waha dash aa jayega
//             setCategoryId(category_id);
//         }
//         getCategories();
//     },[catalogName]); // jb bhi naya url bn rha hai to ye useEffect run ho

//     // ab iss next useEffect se uss jo category nikale uska sara data nikal lege
//     useEffect(() => {
//         const getCategoryDetails = async() => {
//             try{
//                 const res = await getCatalogaPageData(categoryId);
//                 console.log("PRinting res: ", res);
//                 setCatalogPageData(res);
//             }
//             catch(error) {
//                 console.log(error)
//             }
//         }
//         if(categoryId) { // category null nhi hai
//             getCategoryDetails();
//         }
        
//     },[categoryId]); // isliye jb bhi category id change hogi tb ye call hoga


//     if (loading || !catalogPageData) {
//         return (
//           <div className="grid min-h-[calc(100vh-3.5rem)] place-items-center">
//             <div className="spinner"></div>
//           </div>
//         )
//       }
//       if (!loading && !catalogPageData.success) {
//         return <Error />
//       }
    
//       return (
//         <>
//           {/* Hero Section */}
//           <div className=" box-content bg-richblack-800 px-4">
//             <div className="mx-auto flex min-h-[260px] max-w-maxContentTab flex-col justify-center gap-4 lg:max-w-maxContent ">
//               <p className="text-sm text-richblack-300">
//                 {`Home / Catalog / `}
//                 <span className="text-yellow-25">
//                   {catalogPageData?.data?.selectedCategory?.name}
//                 </span>
//               </p>
//               <p className="text-3xl text-richblack-5">
//                 {catalogPageData?.data?.selectedCategory?.name}
//               </p>
//               <p className="max-w-[870px] text-richblack-200">
//                 {catalogPageData?.data?.selectedCategory?.description}
//               </p>
//             </div>
//           </div>
    
//           {/* Section 1 */}
//           <div className=" mx-auto box-content w-full max-w-maxContentTab px-4 py-12 lg:max-w-maxContent">
//             <div className="section_heading">Courses to get you started</div>
//             <div className="my-4 flex border-b border-b-richblack-600 text-sm">
//               <p
//                 className={`px-4 py-2 ${
//                   active === 1
//                     ? "border-b border-b-yellow-25 text-yellow-25"
//                     : "text-richblack-50"
//                 } cursor-pointer`}
//                 onClick={() => setActive(1)}
//               >
//                 Most Popular
//               </p>
//               <p
//                 className={`px-4 py-2 ${
//                   active === 2
//                     ? "border-b border-b-yellow-25 text-yellow-25"
//                     : "text-richblack-50"
//                 } cursor-pointer`}
//                 onClick={() => setActive(2)}
//               >
//                 New
//               </p>
//             </div>
//             <div>
//               <CourseSlider
//                 Courses={catalogPageData?.data?.selectedCategory?.courses}
//               />
//             </div>
//           </div>
//           {/* Section 2 */}
//           <div className=" mx-auto box-content w-full max-w-maxContentTab px-4 py-12 lg:max-w-maxContent">
//             <div className="section_heading">
//               Top courses in {catalogPageData?.data?.differentCategory?.name}
//             </div>
//             <div className="py-8">
//               <CourseSlider
//                 Courses={catalogPageData?.data?.differentCategory?.courses}
//               />
//             </div>
//           </div>
    
//           {/* Section 3 */}
//           <div className=" mx-auto box-content w-full max-w-maxContentTab px-4 py-12 lg:max-w-maxContent">
//             <div className="section_heading">Frequently Bought</div>
//             <div className="py-8">
//               <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
//                 {catalogPageData?.data?.mostSellingCourses
//                   ?.slice(0, 4)
//                   .map((course, i) => (
//                     <Course_Card course={course} key={i} Height={"h-[400px]"} />
//                   ))}
//               </div>
//             </div>
//           </div>
    
//           <Footer />
//         </>
//       )
//     }
    
//     export default Catalog