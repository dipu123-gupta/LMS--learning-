import { configureStore } from "@reduxjs/toolkit";
import authSliceReducer from "./Slices/AuthSlice.js";
import courseSlice from "./Slices/CourseSlice.js";
import razorpaySlice from "./Slices/RazorpaySlice.js";
import lectureSlice from "./Slices/LectureSlice.js";
import passwordReducer from "./Slices/PasswordSlice.js";
import statReducer from "./Slices/StatSlice.js";

const store = configureStore({
  reducer: {
    auth: authSliceReducer,
    Courses: courseSlice,
    razorpay: razorpaySlice,
    lecture: lectureSlice,
    password: passwordReducer,
    stat: statReducer, 
  },
  devTools: true,
});

export default store;
