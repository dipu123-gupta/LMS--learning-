import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../Helpers/axiosInstance.js";

export const getStateData = createAsyncThunk(
  "stat/get",
  async () => {
    const res = await axiosInstance.get("/admin/stats");
    return res.data;
  }
);

const initialState = {
  allUserCount: 0,
  subscribeCount: 0,
};

const statSlice = createSlice({
  name: "stat",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(getStateData.fulfilled, (state, action) => {
      state.allUserCount = action.payload.allUserCount;
      state.subscribeCount = action.payload.subscribeCount;
    });
  },
});

export default statSlice.reducer;
