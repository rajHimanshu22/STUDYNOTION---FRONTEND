
import { useEffect, useState } from "react"
import { useSelector } from "react-redux"

// requirement/instruction input create kr rhe
export default function RequirementsField({
  name,
  label,
  register,
  setValue,
  errors,
  getValues,
}) {
  const { editCourse, course } = useSelector((state) => state.course)
  const [requirement, setRequirement] = useState("")
  const [requirementsList, setRequirementsList] = useState([])

  useEffect(() => {
    if (editCourse) {
      setRequirementsList(course?.instructions)
    }
    register(name, { required: true, validate: (value) => value.length > 0 }) // first render pr register krege
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    setValue(name, requirementsList)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [requirementsList])  // jb requirement ki value change ho rhi hai tb hmlog iski value set krege setvalue jo
  // rkhe hai requirementfield.jsx kyunki requirementfield.jsx me value set kr ke rkhe hai

  const handleAddRequirement = () => {
    if (requirement) { // agar requirement me kuch hai
      setRequirementsList([...requirementsList, requirement]) // jo purana data hai wo rhene do aur next me naya data add kr do
      setRequirement("")  // and current data ko empty mark kr do
    }
  }

  const handleRemoveRequirement = (index) => {
    const updatedRequirements = [...requirementsList]  // updated list me store krwa liye phle
    updatedRequirements.splice(index, 1) // and then uss updated list me se remove krwa diye
    setRequirementsList(updatedRequirements)
  }

  return (
    <div className="flex flex-col space-y-2">
      <label className="text-sm text-richblack-5" htmlFor={name}>
        {label} <sup className="text-pink-200">*</sup>
      </label>
      <div className="flex flex-col items-start space-y-2">
        <input
          type="text"
          id={name}
          value={requirement}
          onChange={(e) => setRequirement(e.target.value)} // yaha se rquirement me value jayegi aur jb add pr click krega to ye wali value hi requirement me check hogi 
          // jb bhi value change hogi iss input me to requirement state variable me insert ho jayegi
          className="form-style w-full"
        />
        <button
          type="button"
          onClick={handleAddRequirement}
          className="font-semibold text-yellow-50"
        >
          Add
        </button>
      </div>

      {/* add krne ke baad display bhi krwana hai uske liye */}
      {requirementsList.length > 0 && (
        <ul className="mt-2 list-inside list-disc">
          {requirementsList.map((requirement, index) => (
            <li key={index} className="flex items-center text-richblack-5">
              <span>{requirement}</span>
              <button
                type="button"
                className="ml-2 text-xs text-pure-greys-300 "
                onClick={() => handleRemoveRequirement(index)}
              >
                clear
              </button>
            </li>
          ))}
        </ul>
      )}
      {errors[name] && (
        <span className="ml-2 text-xs tracking-wide text-pink-200">
          {label} is required
        </span>
      )}
    </div>
  )
}

// iss page ka bhot use hai alag alag project me bhot project me form bnana hota hai

//The list-style-position property specifies the position of the list-item markers (bullet points).

//list-style-position: outside; means that the bullet points will be outside the list item.
//list-style-position: inside; means that the bullet points will be inside the list item.