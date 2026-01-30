import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../Helpers/axiosInstance.js";
import toast from "react-hot-toast";

const initialState = {
  courseData: [],
};

/* =====================
   GET ALL COURSES
===================== */
export const getAllCourses = createAsyncThunk(
  "courses/getAll",
  async (_, { rejectWithValue }) => {
    try {
      const response = axiosInstance.get("/courses");

      toast.promise(response, {
        loading: "Loading course data...",
        success: "Courses loaded successfully",
        error: "Failed to get the courses",
      });

      return (await response).data.courses;
    } catch (error) {
      toast.error(error?.response?.data?.message);
      return rejectWithValue(error.response?.data);
    }
  }
);

/* =====================
   CREATE NEW COURSE  
===================== */
export const createNewCourse = createAsyncThunk(
  "courses/create",
  async (formData, { rejectWithValue }) => {
    try {
      const response = axiosInstance.post("/courses", formData);

      toast.promise(response, {
        loading: "Creating new course...",
        success: "Course created successfully",
        error: "Failed to create course",
      });

      return (await response).data;
    } catch (error) {
      toast.error(error?.response?.data?.message);
      return rejectWithValue(error.response?.data);
    }
  }
);

/* =====================
   DELETE COURSE
===================== */
export const deleteCourses = createAsyncThunk(
  "courses/delete",
  async (id, { rejectWithValue }) => {
    try {
      const response = axiosInstance.delete(`/courses/${id}`);

      toast.promise(response, {
        loading: "Deleting course...",
        success: "Course deleted successfully",
        error: "Failed to delete the course",
      });

      return (await response).data;
    } catch (error) {
      toast.error(error?.response?.data?.message);
      return rejectWithValue(error.response?.data);
    }
  }
);

const courseSlice = createSlice({
  name: "courses",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAllCourses.fulfilled, (state, action) => {
      state.courseData = action.payload || [];
    });
  },
});

export default courseSlice.reducer;
