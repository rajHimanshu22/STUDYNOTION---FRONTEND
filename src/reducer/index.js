import {combineReducers} from "@reduxjs/toolkit";

import authReducer from "../slices/authSlice";
import profileReducer from "../slices/profileSlice";
import cartReducer from "../slices/cartSlice";
import courseReducer from "../slices/courseSlice"
import viewCourseReducer from "../slices/viewCourseSlice"

// slices se rudecer bnta hai
const rootReducer = combineReducers({  // isme sara reducer mention kr dege
    auth: authReducer,
    profile:profileReducer,
    cart: cartReducer,
    course:courseReducer,
    viewCourse:viewCourseReducer,
    
})

export default rootReducer;