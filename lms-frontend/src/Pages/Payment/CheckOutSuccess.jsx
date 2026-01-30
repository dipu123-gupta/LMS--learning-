import React, { useEffect } from "react";
import HomeLayout from "../../Layouts/HomeLayout.jsx";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getUserData } from "../../Redux/Slices/AuthSlice.js";

const CheckOutSuccess = () => {
  const dispatch = useDispatch(); 
  const navigate = useNavigate();

  useEffect(() => {
    // refresh user after payment
    dispatch(getUserData());

    //  auto redirect after 3 sec
    const timer = setTimeout(() => {
      navigate("/");
    }, 3000);

    return () => clearTimeout(timer);
  }, [dispatch, navigate]);

  return (
    <HomeLayout>
      <div className="min-h-[90vh] flex items-center justify-center text-white">
        <div className="bg-white/10 p-8 rounded-xl shadow-xl text-center space-y-4">
          <h1 className="text-3xl font-bold text-green-400">
            🎉 Payment Successful!
          </h1>

          <p className="text-gray-200">
            Your course has been unlocked successfully.
          </p>

          <p className="text-sm text-gray-400">
            Redirecting to home page...
          </p>
        </div>
      </div>
    </HomeLayout>
  );
};

export default CheckOutSuccess;
