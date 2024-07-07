// create auth ka slice
import {createSlice} from "@reduxjs/toolkit";


// slice create krne se phle initial state define krte hai
const initialState = {
    token: localStorage.getItem("token") ? JSON.parse(localStorage.getItem("token") ): null,
       // ye value initially local storage se lege agar local storage me hai nhi to update kr dege local storage me
    // local storage me agar tab browser bnd bhi kr dege to bhi value sustain krti hai to browser bnd kr ke bhi open krege to purani value hi aa jayegi
    //ye reducers slices se bn rhe hai
    signupData: null,
    loading:false,
};

const authSlice = createSlice({
    name: "auth",
    initialState: initialState,
    reducers : {
        setToken(state,value) {
            state.token = value.payload;
        },
        setSignupData(state, value) {
            state.signupData = value.payload;
          },
          setLoading(state, value) {
            state.loading = value.payload;
          },
    },
});

export const {setToken, setSignupData, setLoading} = authSlice.actions;
export default authSlice.reducer;