import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../Helpers/axiosInstance.js";
import toast from "react-hot-toast";

/* =========================
   FORGOT PASSWORD
========================= */
export const forgotPassword = createAsyncThunk(
  "password/forgot",
  async (email) => {
    try {
      const res = await axiosInstance.post("/user/forgotpassword", { email });
      toast.success(res?.data?.message);
      return res.data;
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to send reset email");
      throw error;
    }
  }
);

/* =========================
   RESET PASSWORD
========================= */
export const resetPassword = createAsyncThunk(
  "password/reset",
  async ({resetToken , password }) => {
    try {
      const res = await axiosInstance.post(
        `/user/reset-password/${resetToken}`,
        { password }
      );
      toast.success(res?.data?.message);
      return res.data;
    } catch (error) {
      toast.error(error?.response?.data?.message || "Reset failed");
      throw error;
    }
  }
);

const passwordSlice = createSlice({
  name: "password",
  initialState: {
    loading: false,
    success: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(forgotPassword.pending, (state) => {
        state.loading = true;
      })
      .addCase(forgotPassword.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(resetPassword.pending, (state) => {
        state.loading = true;
      })
      .addCase(resetPassword.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
      });
  },
});


export default passwordSlice.reducer;
