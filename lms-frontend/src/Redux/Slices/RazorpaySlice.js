import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../Helpers/axiosInstance.js";
import toast from "react-hot-toast";

const initialState = {
  key: "",
  subscription_id: "",
  isPaymentVerified: false,
  allPayments: {},
  monthlySalesRecod: [],
  monthlyRevenue: [], 
  totalRevenue: 0, 
};

/* ======================
   GET RAZORPAY KEY
====================== */

export const getRazorpayId = createAsyncThunk("razorpay/getKey", async () => {
  const res = await axiosInstance.get("/payment/razorpay-key");
  return res.data.key;
});

/* ======================
   BUY SUBSCRIPTION
====================== */

export const purchaseCourseBundle = createAsyncThunk(
  "razorpay/subscribe",
  async ({ courseId }, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.post("/payment/subscribe", {
        courseId,
      });

      return res.data;
    } catch (error) {
      toast.error(error?.response?.data?.message || "Subscription failed");
      return rejectWithValue(error.response.data);
    }
  },
);
/* ======================
   VERIFY PAYMENT
====================== */

export const verifyUserPayment = createAsyncThunk(
  "razorpay/verify",
  async (data, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.post("/payment/verify", data);
      return res.data;
    } catch (error) {
      toast.error("Payment verification failed");
      return rejectWithValue(error.response.data);
    }
  },
);
/* ======================
   GET PAYMENT RECORD (ADMIN)
====================== */
export const getPaymentRecord = createAsyncThunk(
  "/payment/record",
  async () => {
    try {
      const response = await axiosInstance.get("/payment/stats");
      return response.data;
    } catch (error) {
      toast.error("Failed to get payment records");
      throw error;
    }
  },
);

/* ======================
   CANCEL SUBSCRIPTION
====================== */
export const cancelCourseBundle = createAsyncThunk(
  "/payment/cancel",
  async () => {
    try {
      const response = await axiosInstance.post("/payment/unsubscribe");
      toast.success(response?.data?.message);
      return response.data;
    } catch (error) {
      toast.error(
        error?.response?.data?.message || "Failed to cancel subscription",
      );
      throw error;
    }
  },
);

export const getPaymentStats = createAsyncThunk("/payment/stats", async () => {
  const res = await axiosInstance.get("/payment/stats");
  return res.data;
});

const razorpaySlice = createSlice({
  name: "razorpay",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getRazorpayId.fulfilled, (state, action) => {
        state.key = action.payload;
      })
      .addCase(purchaseCourseBundle.fulfilled, (state, action) => {
        state.subscription_id = action.payload.order?.id;
      })

      /* Verify */
      .addCase(verifyUserPayment.fulfilled, (state) => {
        state.isPaymentVerified = true;
        toast.success("Payment verified successfully");
      })

      .addCase(verifyUserPayment.rejected, (state) => {
        state.isPaymentVerified = false;
      })

      /* Payment Records */
      .addCase(getPaymentRecord.fulfilled, (state, action) => {
        state.allPayments = action.payload;
        state.monthlySalesRecod = action.payload.monthlySalesRecod || [];
        state.monthlyRevenue = action.payload.monthlyRevenue || [];
        state.totalRevenue = action.payload.totalRevenue || 0;
      })

      .addCase(getPaymentStats.fulfilled, (state, action) => {
        state.monthlySalesRecod = action.payload.monthlySalesRecod || [];
        state.monthlyRevenue = action.payload.monthlyRevenue || [];
        state.totalRevenue = action.payload.totalRevenue || 0;
      });
  },
});

export default razorpaySlice.reducer;
