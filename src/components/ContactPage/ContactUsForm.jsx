import React, { useEffect, useState } from "react"
import { useForm } from "react-hook-form"

import CountryCode from "../../data/countrycode.json"
import { apiConnector } from "../../services/apiconnector"
import { contactusEndpoint } from "../../services/apis"

const ContactUsForm = () => {
  const [loading, setLoading] = useState(false) // ye loading authslice wala loading nhi hai wo authentication ke liye tha
  // ye open route hai- means ki koi logged in nhi hai tb bhi inn routes pr aa skta hai
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitSuccessful },
  } = useForm()
  // ye sb useform se nikal liye

  const submitContactForm = async (data) => {
    // console.log("Form Data - ", data)
    try {
      setLoading(true)
      const res = await apiConnector(
        "POST",
        contactusEndpoint.CONTACT_US_API,
        data
      )
      // console.log("Email Res - ", res)
      setLoading(false)
    } catch (error) {
      console.log("ERROR MESSAGE - ", error.message)
      setLoading(false)
    }
  }

  // ye useEffect se jb form submit ho jaye tb form ke entries ko reset (khali) kr do
  useEffect(() => {
    if (isSubmitSuccessful) {
      reset({
        email: "",
        firstname: "",
        lastname: "",
        message: "",
        phoneNo: "",
      })
    }
  }, [reset, isSubmitSuccessful]) // in 2 chizo ki values change hone pr useEffect chalega- reset func ki value change ho tb bhi ye chale
  // ye rest func useForm hook me likha gya hai
  return (
    <form
      className="flex flex-col gap-7"
      onSubmit={handleSubmit(submitContactForm)} // form submit hone pr submitcontactform func ko call kr dena
    >
      <div className="flex flex-col gap-5 lg:flex-row">

        {/* firstname */}
        <div className="flex flex-col gap-2 lg:w-[48%]">
            {/* iss label ko connect krna chahte hai input tag ke sath so we will use htmlfor */}
          <label htmlFor="firstname" className="lable-style"> 
            First Name
          </label>
          <input
            type="text"
            name="firstname"
            id="firstname"
            placeholder="Enter first name"
            className="form-style"
            {...register("firstname", { required: true })} // firstname ke state ko register krne ke liye
          />
          {errors.firstname && (
            <span className="-mt-1 text-[12px] text-yellow-100">
              Please enter your name.
            </span>
          )}
        </div>

        {/* lastname- lastname optional hai isliye error nhi likhe and required bhi nhi likhe */}
        <div className="flex flex-col gap-2 lg:w-[48%]">
          <label htmlFor="lastname" className="lable-style">
            Last Name
          </label>
          <input
            type="text"
            name="lastname"
            id="lastname"
            placeholder="Enter last name"
            className="form-style"
            {...register("lastname")}
          />
        </div>
      </div>

      {/* email */}
      <div className="flex flex-col gap-2">
        <label htmlFor="email" className="lable-style">
          Email Address
        </label>
        <input
          type="email"
          name="email"
          id="email"
          placeholder="Enter email address"
          className="form-style"
          {...register("email", { required: true })}
        />
        {errors.email && (
          <span className="-mt-1 text-[12px] text-yellow-100">
            Please enter your Email address.
          </span>
        )}
      </div>

      {/* phone number */}
      <div className="flex flex-col gap-2">
        <label htmlFor="phonenumber" className="lable-style">
          Phone Number
        </label>

        <div className="flex gap-5">
          {/* dropdown of country codes */}  
          {/* select is an inline element and div is an block element - frontend video 6 jisme 2:00:00 pr error aa rha hai */}
          <div className="flex w-[81px] flex-col gap-2">
            <select
              type="text"
              name="firstname"
              id="firstname"
              placeholder="Enter first name"
              className="form-style"
              {...register("countrycode", { required: true })}
            >
              {CountryCode.map((ele, i) => {
                return (
                  <option key={i} value={ele.code}>
                    {ele.code} -{ele.country}
                  </option> // country code ko options me direct dalne ki jagah map function use kr ke dale itni country 
                  // ka name nhi likhna pra 
                  // so array me sari chizo ko traverse krne ke liye use map
                )
              })}
            </select>
          </div>
          
          <div className="flex w-[calc(100%-90px)] flex-col gap-2">
            <input
              type="number"
              name="phonenumber"
              id="phonenumber"
              placeholder="12345 67890"
              className="form-style"
              {...register("phoneNo", {
                required: {
                  value: true,
                  message: "Please enter your Phone Number.",
                },
                maxLength: { value: 12, message: "Invalid Phone Number" }, // isse jyada hua to message likha hua aa jayega
                minLength: { value: 10, message: "Invalid Phone Number" }, // isse km length ka no hua to "Invalid Phone Number" likha aa jayega
              })}// bs itna likhne se useForm me validation ho jayega
            />
          </div>
        </div>
        {errors.phoneNo && (
          <span className="-mt-1 text-[12px] text-yellow-100">
            {errors.phoneNo.message}
          </span>
        )}
      </div>

      {/* message box */}
      <div className="flex flex-col gap-2">
        <label htmlFor="message" className="lable-style">
          Message
        </label>
        <textarea
          name="message"
          id="message"
          cols="30"
          rows="7"
          placeholder="Enter your message here"
          className="form-style"
          {...register("message", { required: true })}
        />
        {errors.message && (
          <span className="-mt-1 text-[12px] text-yellow-100">
            Please enter your Message.
          </span>
        )}
      </div>

      <button
        disabled={loading}
        type="submit"
        className={`rounded-md bg-yellow-50 px-6 py-3 text-center text-[13px] font-bold text-black shadow-[2px_2px_0px_0px_rgba(255,255,255,0.18)] 
         ${
           !loading &&
           "transition-all duration-200 hover:scale-95 hover:shadow-none"
         }  disabled:bg-richblack-500 sm:text-[16px] `}
      >
        Send Message
      </button>
    </form>
  )
}

export default ContactUsForm


// forname
// The htmlFor property sets or returns the value of the for attribute of a label.
// The for attribute specifies which form element a label is bound to.
// The prop 'htmlFor' in JSX is the same as attribute 'for' in HTML. 
// It is used for labels to link them with their inputs (using input id). 
// So that when clicking on this label is the same as clicking on the input. 
// It is especially helpful for checkboxes and radio buttons.
//it's a regular HTML attribute for labels, indicating which element it is a label for:
//'htmlFor' is used in JSX which is same as 'for' in HTML, used for accessibility

// textarea and text-input
//The text input is meant to receive any small string of characters such as: Username, Name, Last Name, Date of birth, etc. 
//The textarea is ideal for long text inputs.

// inline and block elements
// HTML Block elements, are used to structure the main content of a webpage. They typically 
// start on a new line and take up the full width of their container examples <div>, <p>, <h1> to <h6>, and <ul>, etc.
{/* On the other hand, Inline elements are used within block-level elements to style or format specific parts 
// of the content. They don’t start on a new line and 
//</ul>only take up as much width as necessary for example include <span>, <a>, <strong>, and <em>. */}
