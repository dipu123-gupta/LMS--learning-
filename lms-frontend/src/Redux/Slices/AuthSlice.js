import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../Helpers/axiosInstance.js";
import toast from "react-hot-toast";

const initialState = {
  isLoggedIn: localStorage.getItem("isLoggedIn") === "true",
  role: localStorage.getItem("role") || "",
  data: JSON.parse(localStorage.getItem("data")) || {},
  loading: true, // auth hydration flag
};

/* ======================
   REGISTER
====================== */
export const createAccount = createAsyncThunk("/auth/signup", async (data) => {
  const res = axiosInstance.post("/user/register", data);
  toast.promise(res, {
    loading: "Creating account...",
    success: (data) => data?.data?.message,
    error: "Failed to create account",
  });
  return (await res).data;
});

/* ======================
   LOGIN
====================== */
export const login = createAsyncThunk("/auth/login", async (data) => {
  const res = axiosInstance.post("/user/login", data);
  toast.promise(res, {
    loading: "Authenticating...",
    success: (data) => data?.data?.message,
    error: "Failed to login",
  });
  return (await res).data;
});

/* ======================
   LOGOUT
====================== */
export const logout = createAsyncThunk("/auth/logout", async () => {
  try {
    const res = await axiosInstance.post("/user/logout");
    toast.success(res?.data?.message || "Logged out");
    return true;
  } catch (error) {
    return true;
  }
});

/* ======================
   UPDATE PROFILE
====================== */
export const updateProfile = createAsyncThunk(
  "/user/update/profile",
  async ({ formData }) => {
    const res = axiosInstance.put("/user/update", formData);
    toast.promise(res, {
      loading: "Updating profile...",
      success: (data) => data?.data?.message,
      error: "Failed to update profile",
    });
    return (await res).data;
  }
);

/* ======================
   🔥 LOAD USER (MAIN DEBUG POINT)
====================== */
export const getUserData = createAsyncThunk(
  "/user/details",
  async (_, { rejectWithValue }) => {
    try {
      console.log("🟡 getUserData API CALL STARTED");

      const res = await axiosInstance.get("/user/profile");

      console.log("🟢 getUserData RESPONSE 👉", res.data);

      return res.data;
    } catch (error) {
      console.error("🔴 getUserData ERROR 👉", error?.response?.data);
      return rejectWithValue(error?.response?.data);
    }
  }
);

/* ======================
   CHANGE PASSWORD
====================== */
export const changePassword = createAsyncThunk(
  "auth/changePassword",
  async (data, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.post("/user/change-password", data);
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      /* LOGIN */
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        if (!action.payload?.user) return;

        console.log("🟢 LOGIN USER 👉", action.payload.user);

        const user = action.payload.user;
        localStorage.setItem("data", JSON.stringify(user));
        localStorage.setItem("isLoggedIn", "true");
        localStorage.setItem("role", user.role);

        state.isLoggedIn = true;
        state.data = user;
        state.role = user.role;
      })

      /* LOGOUT */
      .addCase(logout.fulfilled, (state) => {
        console.log("🟠 LOGOUT SUCCESS");
        localStorage.clear();
        state.isLoggedIn = false;
        state.role = "";
        state.data = {};
        state.loading = false;
      })
      .addCase(logout.rejected, (state) => {
        console.log("🔴 LOGOUT FAILED – FORCE CLEAR");
        localStorage.clear();
        state.isLoggedIn = false;
        state.role = "";
        state.data = {};
        state.loading = false;
      })

      /* 🔥 LOAD USER (THIS IS KEY) */
      .addCase(getUserData.fulfilled, (state, action) => {
        state.loading = false;

        console.log("🟢 AUTH SLICE UPDATED USER 👉", action.payload?.user);

        if (!action.payload?.user) return;

        const user = action.payload.user;
        localStorage.setItem("data", JSON.stringify(user));
        localStorage.setItem("isLoggedIn", "true");
        localStorage.setItem("role", user.role);

        state.isLoggedIn = true;
        state.data = user;
        state.role = user.role;
      })

      .addCase(getUserData.rejected, (state, action) => {
        console.error("🔴 AUTH REFRESH FAILED 👉", action.payload);
        state.loading = false;
        localStorage.clear();
      })

      /* CHANGE PASSWORD */
      .addCase(changePassword.fulfilled, (state) => {
        toast.success("Password changed successfully, please login again");
        localStorage.clear();
        state.isLoggedIn = false;
        state.role = "";
        state.data = {};
        state.loading = false;
      })

      .addCase(changePassword.rejected, (_, action) => {
        toast.error(action.payload?.message || "Failed to change password");
      });
  },
});

export default authSlice.reducer;
