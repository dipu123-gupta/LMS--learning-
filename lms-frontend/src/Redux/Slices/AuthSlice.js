import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../Helpers/axiosInstance.js";
import toast from "react-hot-toast";

const initialState = {
  isLoggedIn: false,
  role: "",
  data: {},
  loading: true, // ✅ auth hydration flag
};

/* ======================
   REGISTER
====================== */
export const createAccount = createAsyncThunk("/auth/signup", async (data) => {
  try {
    const res = axiosInstance.post("/user/register", data);
    toast.promise(res, {
      loading: "Creating account...",
      success: (data) => data?.data?.message,
      error: "Failed to create account",
    });

    return (await res).data;
  } catch (error) {
    toast.error(error?.response?.data?.message);
  }
});

/* ======================
   LOGIN
====================== */
export const login = createAsyncThunk("/auth/login", async (data) => {
  try {
    const res = axiosInstance.post("/user/login", data);
    toast.promise(res, {
      loading: "Authenticating...",
      success: (data) => data?.data?.message,
      error: "Failed to login",
    });

    return (await res).data;
  } catch (error) {
    toast.error(error?.response?.data?.message);
  }
});

/* ======================
   LOGOUT
====================== */
export const logout = createAsyncThunk("/auth/logout", async () => {
  try {
    const res = axiosInstance.post("/user/logout");
    toast.promise(res, {
      loading: "Logging out...",
      success: (data) => data?.data?.message,
      error: "Failed to logout",
    });

    return (await res).data;
  } catch (error) {
    toast.error(error?.response?.data?.message);
  }
});

/* ======================
   UPDATE PROFILE
====================== */
export const updateProfile = createAsyncThunk(
  "/user/update/profile",
  async ({ id, formData }) => {
    const res = axiosInstance.put(`/user/update`, formData);
    toast.promise(res, {
      loading: "Updating profile...",
      success: (data) => data?.data?.message,
      error: "Failed to update profile",
    });
    return (await res).data;
  },
);

/* ======================
   LOAD USER (REFRESH FIX)
====================== */
export const getUserData = createAsyncThunk(
  "/user/details",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.get("/user/profile");
      return res.data;
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  },
);

/* ======================
   CHANGE PASSWORD
====================== */
export const changePassword = createAsyncThunk(
  "auth/changePassword",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post("/user/change-password", data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  },
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
        state.loading = false; 
        localStorage.clear();
        state.isLoggedIn = false;
        state.role = "";
        state.data = {};
      })

      /* LOAD USER (REFRESH) */
      .addCase(getUserData.fulfilled, (state, action) => {
        state.loading = false; 
        if (!action.payload?.user) return;
        const user = action.payload.user;
        localStorage.setItem("data", JSON.stringify(user));
        localStorage.setItem("isLoggedIn", "true");
        localStorage.setItem("role", user.role);
        state.isLoggedIn = true;
        state.data = user;
        state.role = user.role;
      })
      .addCase(getUserData.rejected, (state) => {
        state.loading = false; 
        state.isLoggedIn = false;
        state.role = "";
        state.data = {};
      })

      /* CHANGE PASSWORD */
      .addCase(changePassword.fulfilled, (state) => {
        state.isLoggedIn = false;
        state.data = null;
      })

      .addCase(changePassword.rejected, (_, action) => {
        toast.error(action.payload?.message || "Failed to change password");
      });
  },
});

export default authSlice.reducer;
