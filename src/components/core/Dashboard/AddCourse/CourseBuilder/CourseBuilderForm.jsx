
import { useState } from "react"
import { useForm } from "react-hook-form"
import { toast } from "react-hot-toast"
import { IoAddCircleOutline } from "react-icons/io5"
import { MdNavigateNext } from "react-icons/md"
import { useDispatch, useSelector } from "react-redux"

import {
  createSection,
  updateSection,
} from "../../../../../services/operations/courseDetailsAPI"
import {
  setCourse,
  setEditCourse,
  setStep,
} from "../../../../../slices/courseSlice"
import IconBtn from "../../../../common/IconBtn"
import NestedView from "./NestedView"

export default function CourseBuilderForm() {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm()

  const { course } = useSelector((state) => state.course)
  const { token } = useSelector((state) => state.auth)
  const [loading, setLoading] = useState(false)
  const [editSectionName, setEditSectionName] = useState(null) // button konsa dikhana hai iske liye ye bnaye
  const dispatch = useDispatch()

  // handle form submission
  const onSubmit = async (data) => {
    // console.log(data)
    setLoading(true)

    let result

    // create section ya editsection name wala button press ho jaye tb on submit chalega - mtlb ye section create and edit dono krta hoga
    if (editSectionName) {
      // check kr lo edit kr rhe hai ya create kr rhe hai
      // we are editing the section name
      result = await updateSection(
        { 
          // backend (controller/section.js) me dekh kr pta lga ki kya kya pass krna hai hme yaha
          sectionName: data.sectionName,
          sectionId: editSectionName, // true false se
          courseId: course._id,
        },
        token // token pass kiye ye smjhne ke liye courseDetailApi me updatesection() se smjh skte hai
      )
      // console.log("edit", result)
    } else {
      // agar edit nhi kr rhe to create krege
      result = await createSection(
        {
          sectionName: data.sectionName,
          courseId: course._id,
        },
        token
      )
    }

    // update values
    if (result) {
      // console.log("section result", result)
      // section add hone se course ki value change hogi
      dispatch(setCourse(result))
      setEditSectionName(null)
      setValue("sectionName", "")
    }
    // loading false
    setLoading(false)
  }

  // cancel button ke liye
  const cancelEdit = () => {
    setEditSectionName(null)  // isse button change ho jayega
    setValue("sectionName", "") // aur isse form hook ka value bhi empty kr do - because ki cancel krne prjo likha wo bhi ht jaye
  }

  // jb nested me edit pr click kr rhe hai to upar me jo input and button wala me bhi change hota hai
  // mtlb edit pr click krne pr upar ke state me change ho rhi hai aur pura logic 1 flag editsectionname ke basis pr chalta hai
  const handleChangeEditSectionName = (sectionId, sectionName) => {
    if (editSectionName === sectionId) { // isse basically editsectionname ko toggle kr rhe hai
      cancelEdit()
      return
    }
    setEditSectionName(sectionId)
    setValue("sectionName", sectionName)
  }

  const goToNext = () => {  // next(2 -> 3) pr tb hi ja payege jb hm section and subsection create kiye hue ho atleast 1 video dale ho
    if (course.courseContent.length === 0) {
      toast.error("Please add atleast one section")
      return
    }
    if (
      course.courseContent.some((section) => section.subSection.length === 0)
    ) {
      toast.error("Please add atleast one lecture in each section")
      return
    }
    // if everything is good
    dispatch(setStep(3))
  }

  const goBack = () => {
    dispatch(setStep(1))
    dispatch(setEditCourse(true)) // back ja rhe hai to bs edit krege new course create nhi krege
  }

  return (
    <div className="space-y-8 rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-6">
      <p className="text-2xl font-semibold text-richblack-5">Course Builder</p>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="flex flex-col space-y-2">
          <label className="text-sm text-richblack-5" htmlFor="sectionName">
            Section Name <sup className="text-pink-200">*</sup>
          </label>
          <input
            id="sectionName"
            disabled={loading}
            placeholder="Add a section to build your course"
            {...register("sectionName", { required: true })}
            className="form-style w-full"
          />
          {errors.sectionName && (
            <span className="ml-2 text-xs tracking-wide text-pink-200">
              Section name is required
            </span>
          )}
        </div>
        <div className="flex items-end gap-x-4">
          <IconBtn
            type="submit"
            disabled={loading}
            text={editSectionName ? "Edit Section Name" : "Create Section"} // ye button 2 kaam kr rha isko hi define krne ke liye editsectionname state variable bnaye jo as a flag hoga ki button se konsa kaam krwana hai btayega
            outline={true}
          >
            <IoAddCircleOutline size={20} className="text-yellow-50" />
          </IconBtn> 
          {/* yaha edit button ka image bhi aa usko iconbtn me dale hue hai isliye so fix iconbtn */}
          {editSectionName && (
            <button
              type="button"
              onClick={cancelEdit}
              className="text-sm text-richblack-300 underline"
            >
              Cancel Edit 
            </button>// side me cancel edit button
          )}
        </div>
      </form>

      {/* nested view dikhana hai section ka - section course me courseContent me hai course schema me aur section ke ander subsection hai jisme video lectures hai */}
      {/* course me sections hoga to hi dikhaye isliye > 0 */}
      {course.courseContent.length > 0 && (
        <NestedView handleChangeEditSectionName={handleChangeEditSectionName} />
      )}

      {/* Next Prev Button */}
      <div className="flex justify-end gap-x-3">
        <button
          onClick={goBack} //jb back (2 -> 1) jayege to course create nhi kr rhe hoge hm usko edit kr rhe hoge
          className={`flex cursor-pointer items-center gap-x-2 rounded-md bg-richblack-300 py-[8px] px-[20px] font-semibold text-richblack-900`}
        >
          Back
        </button>
        <IconBtn disabled={loading} text="Next" onclick={goToNext}>
          <MdNavigateNext />
        </IconBtn>
      </div>
    </div>
  )
}

// type attribute in button importance
//If your buttons are not for submitting form data to a server, be sure to set their type attribute to button . 
//Otherwise they will try to submit form data and 
//to load the (nonexistent) response, possibly destroying the current state of the document.

// <button type="button"> means it is a normal button and you have to bind click event to it to do some action.
// Yep, there's a reason - but (usually) only if you're in a <form> element.

// If you include a button in a form element without specifying it's just a regular button, it defaults to a submit button.

// <form>
//     <button>I will submit the form when clicked!</button>
// </form>

// vs

// <form>
//     <button type='button'>I won't!</button>
// </form>
