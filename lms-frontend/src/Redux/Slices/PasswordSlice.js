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
  async ({ token, password }) => {
    try {
      const res = await axiosInstance.post(
        `/user/reset-password/${token}`,
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
  initialState: {},
  reducers: {},
});

export default passwordSlice.reducer;
