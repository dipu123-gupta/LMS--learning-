import { Routes, Route } from "react-router-dom";
import "./App.css";
import HomePage from "./Pages/HomePage.jsx";
import AboutUs from "./Pages/AboutUs.jsx";
import NotFound from "./Pages/NotFound.jsx";
import Signup from "./Pages/Signup.jsx";
import Login from "./Pages/Login.jsx";
import Courses from "./Pages/course/Courses.jsx";
import Contact from "./Pages/Contact.jsx";
import Denied from "./Pages/Denied.jsx";
import CourseDescription from "./Pages/course/CourseDescription.jsx";
import RequireAuth from "./Components/Auth/RequireAuth.jsx";
import CreateCourse from "./Pages/course/CreateCourse.jsx";
import Profile from "./Pages/User/Profile.jsx";
import EditProfile from "./Pages/User/EditProfile.jsx";
import Checkout from "./Pages/Payment/Checkout.jsx";
import CheckOutSuccess from "./Pages/Payment/CheckOutSuccess.jsx";
import FailCheckout from "./Pages/Payment/FailCheckout.jsx";
import DisplayLecture from "./Pages/Dasbord/DisplayLecture.jsx";
import AddLecture from "./Pages/Dasbord/AddLecture.jsx";
import ChangePassword from "./Pages/User/ChangePassword.jsx";
import ForgotPassword from "./Pages/Auth/ForgotPassword.jsx";
import ResetPassword from "./Pages/Auth/ResetPassword.jsx";
import AdminDashboard from "./Pages/Dasbord/AdminDashboard.jsx";

import { useDispatch  } from "react-redux";
import { useEffect } from "react";
import { getUserData } from "./Redux/Slices/AuthSlice";

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getUserData());
  }, [dispatch]);

  return (

    <Routes>
    
      {/* 🌐 Public Routes */}
      <Route path="/" element={<HomePage />} />
      <Route path="/about" element={<AboutUs />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/login" element={<Login />} />
      <Route path="/courses" element={<Courses />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/course/description/:id" element={<CourseDescription />} />
      <Route path="/denied" element={<Denied />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/reset-password/:token" element={<ResetPassword />} />

      {/* 🔐 Admin Protected Routes */}
      <Route element={<RequireAuth allowedRole={["admin"]} />}>
        <Route path="/course/create" element={<CreateCourse />} />
        <Route path="/course/addlecture" element={<AddLecture />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
      </Route>

      {/* 🔐 User + Admin Protected Routes */}
      <Route element={<RequireAuth allowedRole={["admin", "user"]} />}>
        <Route path="/user/profile" element={<Profile />} />
        <Route path="/user/editProfile" element={<EditProfile />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/checkout/success" element={<CheckOutSuccess />} />
        <Route path="/checkout/fail" element={<FailCheckout />} />
        <Route path="/course/display-lectures" element={<DisplayLecture />} />
        <Route path="/changePassword" element={<ChangePassword />} />
      </Route>

      {/* ❌ 404 */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
