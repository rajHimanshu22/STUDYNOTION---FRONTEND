import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"

import IconBtn from "../../../common/IconBtn"
//import { buyCourse } from "../../../../services/operations/studentFeaturesAPI"
import {loadStripe} from '@stripe/stripe-js';
import { toast } from "react-hot-toast"

const BASE_URL = process.env.REACT_APP_BASE_URL;

export default function RenderTotalAmount() {
  const { total, cart } = useSelector((state) => state.cart)
  const { token } = useSelector((state) => state.auth)
  const { user } = useSelector((state) => state.profile)
  const navigate = useNavigate()
  const dispatch = useDispatch()

  // const handleBuyCourse = () => {
  //   const courses = cart.map((course) => course._id); // jo course buy krna hai uski id nikal li
  //   console.log("Bought these course:", courses);
  //   //buyCourse(token, courses, user, navigate, dispatch) // ye payment integration ke baad add krege
  //   // TODO: Api integrate -> payment gateway tk leke jayegi
  // }

  //PAYMENT INTEGRATION

  const handleBuyCourse = async()=>{
    const stripe = await loadStripe("pk_test_51PHJFQSCnOz0vYsuyhMR5tit6wc6qx2MjXk7CHX3sWLQEWM50VlWOVez0AJJpZfwsodSROYWn5dYXW4t1MbpTKjm002TwTOUL4");

    const body = {
        products:cart
    }
    const headers = {
        "Content-Type":"application/json"
    }
    const response = await fetch("http://localhost:4000/api/v1/payment/create-checkout-session",{
        method:"POST",
        headers:headers,
        body:JSON.stringify(body)
    });

    const session = await response.json();

    const result = stripe.redirectToCheckout({
        sessionId:session.id
    });
    
    if(result.error){
        console.log(result.error);
    }
}




  // const  handleBuyCourse = async() => {
  //   try {
  //     const res=await fetch(`${BASE_URL}/payment/checkout-session`,{
  //       method:'post',
  //       headers:{
  //         Authorization:`Bearer ${token}`
  //       }
  //     })

  //     const data = await res.json()

  //     if(!res.ok) {
  //       throw new Error(data.message)
  //     }
  //     if(data.session.url) {
  //       window.location.href = data.session.url
  //     }

  //   }
  //   catch (error) {
  //     toast.error(error.message);
  //   }
  // }




  return (
    <div className="min-w-[280px] rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-6">
      <p className="mb-1 text-sm font-medium text-richblack-300">Total:</p>
      <p className="mb-6 text-3xl font-medium text-yellow-100">₹ {total}</p>
      <IconBtn
        text="Buy Now"
        onclick={handleBuyCourse}
        customClasses="w-full justify-center"
      />
    </div>
  )
}