import { useState } from "react"
import { BiArrowBack } from "react-icons/bi"
import { useDispatch, useSelector } from "react-redux"
import { Link } from "react-router-dom"

import { getPasswordResetToken } from "../services/operations/authApi"

// iss page me hm single component ke use se dono component ko render krwage -- using a flag-- which is email sent or not
// condition ke basis pr rendering

function ForgotPassword() {
  const [email, setEmail] = useState("") // email sent pagee pr email sent hone ke baad email bhi dikha rhe hai isliye store email 
  const [emailSent, setEmailSent] = useState(false); // isse ye decide krege ki konsa page dikhana hai reset pass ya email sent wala
  const dispatch = useDispatch()
  const { loading } = useSelector((state) => state.auth); // jb tak backend se data aa rha h tb tk loading dikha do

  const handleOnSubmit = (e) => {
    e.preventDefault()  // jo bhi default action hai usko hata do
    dispatch(getPasswordResetToken(email, setEmailSent)) // jo khud se action perform krwana chahte hai to dispatch ka use kr lo
     // passwordresettoken backend me func bna chuke hai bs usko call krna hai
     // setemailsent isliye likh rhe hai jisse ki emailsent ka value true update ho aur page bhi update ho jayega jaise hi backend se response
     // aayega waise hi emailsent ka value true ho jayega isse
 }

  return (
    <div className="grid min-h-[calc(100vh-3.5rem)] place-items-center">
      {loading ? (
        <div className="spinner">loading...</div>
      ) : (
        <div className="max-w-[500px] p-4 lg:p-8">
          <h1 className="text-[1.875rem] font-semibold leading-[2.375rem] text-richblack-5">
            {!emailSent ? "Reset your password" : "Check email"}  {/*condition jiske basis pr rendering hoga */}
          </h1>
          <p className="my-4 text-[1.125rem] leading-[1.625rem] text-richblack-100">
            {!emailSent
              ? "Have no fear. We'll email you instructions to reset your password. If you dont have access to your email we can try account recovery"
              : `We have sent the reset email to ${email}`}
          </p>
          <form onSubmit={handleOnSubmit}>
            {!emailSent && (
              <label className="w-full">
                <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">
                  Email Address <sup className="text-pink-200">*</sup>
                </p>
                <input
                  required
                  type="email"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter email address"
                  className="form-style w-full"
                />
              </label>
            )}
            <button
              type="submit"
              className="mt-6 w-full rounded-[8px] bg-yellow-50 py-[12px] px-[12px] font-medium text-richblack-900"
            >
              {!emailSent ? "Sumbit" : "Resend Email"}
            </button>
          </form>
          <div className="mt-6 flex items-center justify-between">
            <Link to="/login">
              <p className="flex items-center gap-x-2 text-richblack-5">
                <BiArrowBack /> Back To Login
              </p>
            </Link>
          </div>
        </div>
      )}
    </div>
  )
}

export default ForgotPassword