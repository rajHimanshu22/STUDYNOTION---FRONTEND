import { useEffect, useState } from "react"
import { VscAdd } from "react-icons/vsc"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"

import { fetchInstructorCourses } from "../../../services/operations/courseDetailsAPI"
import IconBtn from "../../common/IconBtn"
import CoursesTable from "./InstructorCourses/CoursesTable"

export default function MyCourses() {
  const { token } = useSelector((state) => state.auth)
  const navigate = useNavigate()
  const [courses, setCourses] = useState([])

  useEffect(() => {
    const fetchCourses = async () => {
      const result = await fetchInstructorCourses(token)
      if (result) {
        setCourses(result)
      }
    }
    fetchCourses()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // create ui in return
  return (
    <div>
      <div className="mb-14 flex items-center justify-between">
        <h1 className="text-3xl font-medium text-richblack-5">My Courses</h1>
        <IconBtn
          text="Add Course"
          onclick={() => navigate("/dashboard/add-course")}
        >
          <VscAdd />
        </IconBtn>
      </div>
      {courses && <CoursesTable courses={courses} setCourses={setCourses} />}
    </div>
  )
}

// WHAT IS BEARER AUTHORIZATION ? 
// Bearer Authorization is an HTTP authentication scheme commonly used with OAuth 2.0. In this approach, the client includes
// an access token in the "Authorization" header using the "Bearer" scheme, granting permission to access 
//protected resources. The server validates the token for authorization. 
//It's a widely used method for securing API access, especially in scenarios involving third-party applications.
// what are third party app ?
//An app that connects with another service (or its app) to either provide enhanced features or access profile 
//information is a third-party app.

// WHAT IS A BEARER TOKEN ?
//A bearer token is a type of token used for authentication and authorization and is used in web applications 
//and APIs to hold user credentials and indicate authorization for requests and access.

//Generating Bearer tokens based on protocols and specifications such as OAuth and JWT (JSON Web Token). 
//The authenticated user obtains the Bearer token issued by the server and sends it to the server in the header 
//of the request. The server verifies the received bearer token and controls user access based on the token. 
//The Bearer token is also usually sent over an encrypted connection via HTTPS. 
//This prevents unauthorized access by malicious third parties even if the token is stolen.