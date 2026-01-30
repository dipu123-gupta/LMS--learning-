import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../Helpers/axiosInstance.js";
import { toast } from "react-hot-toast";

const initialState = {
  lectures: [],
};

/* GET LECTURES */
export const getCourseLecture = createAsyncThunk(
  "/course/lecture/get",
  async (cid) => {
    try {
      const responsePromise = axiosInstance.get(`/courses/${cid}`);

      toast.promise(responsePromise, {
        loading: "Fetching course lectures",
        success: "Lecture fetched successfully",
        error: "Failed to load the lecture",
      });

      const response = await responsePromise;
      return response.data;
    } catch (error) {
      toast.error(error?.response?.data?.message);
      throw error;
    }
  }
);

/* ADD LECTURE */
export const addCourseLecture = createAsyncThunk(
  "/course/lecture/add",
  async (data) => {
    try {
      const formData = new FormData();
      formData.append("lecture", data.lecture);
      formData.append("title", data.title);
      formData.append("description", data.description);

      const responsePromise = axiosInstance.post(
        `/courses/${data.id}/lecture`,
        formData
      );

      toast.promise(responsePromise, {
        loading: "Adding course lecture",
        success: "Lecture added successfully",
        error: "Failed to add lecture",
      });

      const response = await responsePromise;
      return response.data;
    } catch (error) {
      toast.error(error?.response?.data?.message);
      throw error;
    }
  }
);

/* DELETE LECTURE */
export const deleteCourseLecture = createAsyncThunk(
  "/course/lecture/delete",
  async ({ courseId, lectureId }) => {
    try {
      const responsePromise = axiosInstance.delete(
        `/courses/${courseId}/lecture/${lectureId}`
      );

      toast.promise(responsePromise, {
        loading: "Deleting lecture",
        success: "Lecture deleted successfully",
        error: "Failed to delete lecture",
      });

      const response = await responsePromise;
      return response.data;
    } catch (error) {
      toast.error(error?.response?.data?.message);
      throw error;
    }
  }
);

const lectureSlice = createSlice({
  name: "lecture",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getCourseLecture.fulfilled, (state, action) => {
        state.lectures = action?.payload?.lectures || [];
      })
      .addCase(addCourseLecture.fulfilled, (state, action) => {
        state.lectures = action?.payload?.course?.lectures || [];
      });
  },
});

export default lectureSlice.reducer;
