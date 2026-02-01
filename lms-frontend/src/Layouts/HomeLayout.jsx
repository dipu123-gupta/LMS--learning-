import React from "react";
import { FiMenu } from "react-icons/fi";
import { AiFillCloseCircle } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import Footer from "../Components/Footer.jsx";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "./../Redux/Slices/AuthSlice.js";

const HomeLayout = ({ children }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const isLoggedIn = useSelector((state) => state?.auth?.isLoggedIn);
  const role = useSelector((state) => state?.auth?.role);

  const changeWith = () => {
    const drawerSide = document.getElementsByClassName("drawer-side");
    if (drawerSide[0]) drawerSide[0].style.width = "auto";
  };

  const hideDrawer = () => {
    const element = document.getElementsByClassName("drawer-toggle");
    if (element[0]) element[0].checked = false;

    const drawerSide = document.getElementsByClassName("drawer-side");
    if (drawerSide[0]) drawerSide[0].style.width = "0";
  };

  const handleLogot = async (e) => {
    e.preventDefault();
    const res = await dispatch(logout());
    if (res?.payload?.success) {
      navigate("/");
    }
  };

  return (
    <div className="min-h-[90vh] relative">

      {/* ================= DRAWER ================= */}
      <div className="drawer fixed left-0 top-0 z-50">
        <input id="my-drawer" type="checkbox" className="drawer-toggle" />

        {/* MENU ICON */}
        <div className="drawer-content">
          <label htmlFor="my-drawer" className="cursor-pointer">
            <FiMenu
              onClick={changeWith}
              size={32}
              className="text-white m-4"
            />
          </label>
        </div>

        {/* SIDEBAR */}
        <div className="drawer-side w-0">
          <label
            htmlFor="my-drawer"
            className="drawer-overlay"
            onClick={hideDrawer}
          ></label>

          <ul
            className="
              menu
              p-4
              w-64 sm:w-72
              min-h-full
              bg-base-300
              text-base-content
              relative
              shadow-2xl
            "
          >
            {/* CLOSE BUTTON */}
            <li className="absolute right-3 top-3">
              <button onClick={hideDrawer}>
                <AiFillCloseCircle size={22} />
              </button>
            </li>

            {/* LINKS */}
            <li onClick={hideDrawer}>
              <Link to="/">Home</Link>
            </li>

            {isLoggedIn && role === "admin" && (
              <li onClick={hideDrawer}>
                <Link to="/admin/dashboard">Admin Dashboard</Link>
              </li>
            )}

            {isLoggedIn && role === "admin" && (
              <li onClick={hideDrawer}>
                <Link to="/course/create">Create New Course</Link>
              </li>
            )}

            <li onClick={hideDrawer}>
              <Link to="/courses">All Courses</Link>
            </li>

            <li onClick={hideDrawer}>
              <Link to="/contact">Contact Us</Link>
            </li>

            <li onClick={hideDrawer}>
              <Link to="/about">About Us</Link>
            </li>

            {/* AUTH BUTTONS */}
            {!isLoggedIn && (
              <li className="absolute bottom-4 w-[90%] left-1/2 -translate-x-1/2">
                <div className="flex gap-3">
                  <Link
                    to="/login"
                    onClick={hideDrawer}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md font-semibold w-full text-center"
                  >
                    Login
                  </Link>

                  <Link
                    to="/signup"
                    onClick={hideDrawer}
                    className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-md font-semibold w-full text-center"
                  >
                    SignUp
                  </Link>
                </div>
              </li>
            )}

            {isLoggedIn && (
              <li className="absolute bottom-4 w-[90%] left-1/2 -translate-x-1/2">
                <div className="flex gap-3">
                  <Link
                    to="/user/profile"
                    onClick={hideDrawer}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md font-semibold w-full text-center"
                  >
                    Profile
                  </Link>

                  <button
                    onClick={(e) => {
                      hideDrawer();
                      handleLogot(e);
                    }}
                    className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-md font-semibold w-full"
                  >
                    Logout
                  </button>
                </div>
              </li>
            )}
          </ul>
        </div>
      </div>

      {/* ================= PAGE CONTENT ================= */}
      <div className="pt-14">{children}</div>

      {/* ================= FOOTER ================= */}
      <Footer />
    </div>
  );
};


export default HomeLayout;
