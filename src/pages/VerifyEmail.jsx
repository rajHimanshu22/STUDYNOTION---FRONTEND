// verify email by otp wala page

import { useEffect, useState } from "react";
import OtpInput from "react-otp-input"; // to show otp jaisa dalne wala interface
import { Link } from "react-router-dom";
import { BiArrowBack } from "react-icons/bi";
import { RxCountdownTimer } from "react-icons/rx";
import { useDispatch, useSelector } from "react-redux";
import { sendOtp, signUp } from "../services/operations/authApi";
import { useNavigate } from "react-router-dom";

function VerifyEmail() {
  const [otp, setOtp] = useState("");
  const { signupData, loading } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    // Only allow access of this route when user has filled the signup form
    // agar signup data nhi hai to signup page pr jao
    if (!signupData) {
      navigate("/signup");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleVerifyAndSignup = (e) => {
    e.preventDefault(); // purani chize hta do
    const {
      accountType,
      firstName,
      lastName,
      email,
      password,
      confirmPassword,
    } = signupData;

    // dispatch func me signup hai to jo bhi chiz sign up me hai wo sb nikal lo aur wo sb chiz redux se signup me authslice me store kiye hue hai
    dispatch( // iss function ko dispatch krna hai
      signUp(
        accountType,
        firstName,
        lastName,
        email,
        password,
        confirmPassword,
        otp,
        navigate
      )
    );
  };

  return (
    <div className="min-h-[calc(100vh-3.5rem)] grid place-items-center">
      {loading ? (
        <div>
          <div className="spinner"></div>
        </div>
      ) : (
        <div className="max-w-[500px] p-4 lg:p-8">
          <h1 className="text-richblack-5 font-semibold text-[1.875rem] leading-[2.375rem]">
            Verify Email
          </h1>
          <p className="text-[1.125rem] leading-[1.625rem] my-4 text-richblack-100">
            A verification code has been sent to you. Enter the code below
          </p>
          <form onSubmit={handleVerifyAndSignup}>
            <OtpInput // ye import kiye npm library se
              value={otp} // otp ki value
              onChange={setOtp} // every time onchange pr update the vale of otp in the otp box
              numInputs={6} // kitne input box chahiye
              renderInput={(props) => ( // A function that returns the input that is supposed to be rendered for each of the input fields.
                <input
                  {...props}
                  placeholder="-"
                  renderSeparator={<span>-</span>}
                  style={{
                    boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                  }}
                  inputStyle="w-[20px] rounded-[8px] border-[1px] border-richblack-500 text-[3rem] text-center"
                    focusStyle="border-[5px] border-red-500"
                    isInputNum={true}
                    shouldAutoFocus={true}
                    containerStyle="flex justify-between gap-4" // 81-84 ke bina bhi sahi chal rha hai styling
                  className="w-[48px] lg:w-[60px] border-0 bg-richblack-800 rounded-[0.5rem] text-richblack-5 aspect-square text-center focus:border-0 focus:outline-2 focus:outline-yellow-50"
                />
              )}
              containerStyle={{
                justifyContent: "space-between",
                gap: "0 6px",
              }}
            />
            <button
              type="submit"
              className="w-full bg-yellow-50 py-[12px] px-[12px] rounded-[8px] mt-6 font-medium text-richblack-900"
            >
              Verify Email
            </button>
          </form>
          <div className="mt-6 flex items-center justify-between">
            <Link to="/signup">
              <p className="text-richblack-5 flex items-center gap-x-2">
                <BiArrowBack /> Back To Signup
              </p>
            </Link>
            <button
              className="flex items-center text-blue-100 gap-x-2"
              onClick={() => dispatch(sendOtp(signupData.email,navigate))} // resend krna hai otp ko to sendotp ko call kr diye usko argument me email chahiye to pass kr diye
            >   
            {/* ye navigate func sendotp me jayega waha iska route define hai ki navigate func will go verify-email route */}
              <RxCountdownTimer />
              Resend it
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default VerifyEmail;


//While both Link and navigate components facilitate navigation within React application,they cater to different use cases.
// Link is ideal for creating clickable navigation links within the UI,
//whereas Navigate is useful for triggering navigation based on programmatic logic or conditions.
// It helps to go to the specific URL, forward or backward pages
//To navigate back to previous pages we will use the React useNavigation Hook. 
//We will pass a numerical value to navigation and switch back to the previous 
//page inside the navigate, instance of the useNavigate hook, as a prop and call it when the defined button is clicked.