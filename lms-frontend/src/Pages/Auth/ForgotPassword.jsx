import React, { useState } from "react";
import HomeLayout from "../../Layouts/HomeLayout.jsx";
import { useDispatch } from "react-redux";
import { forgotPassword } from "../../Redux/Slices/PasswordSlice.js";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) return;
    await dispatch(forgotPassword(email));
  };

  return (
    <HomeLayout>
      <div className="min-h-[90vh] flex items-center justify-center px-4 text-white bg-gradient-to-br from-[#0F172A] to-[#020617]">
        <form
          onSubmit={handleSubmit}
          className="
            w-full max-w-sm sm:max-w-md
            bg-[#0f172a]
            p-5 sm:p-6
            rounded-xl
            space-y-4
            shadow-[0_0_15px_black]
          "
        >
          <h1 className="text-lg sm:text-xl font-bold text-center text-yellow-400">
            Forgot Password
          </h1>

          <input
            type="email"
            placeholder="Enter registered email"
            className="
              w-full bg-transparent border border-gray-600
              px-3 py-2
              rounded
              text-sm sm:text-base
              focus:outline-none focus:border-yellow-400
            "
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <button
            className="
              w-full bg-yellow-500 hover:bg-yellow-600
              transition
              py-2.5
              rounded
              font-semibold
              text-black
              text-sm sm:text-base cursor-pointer
            "
          >
            Send Reset Link
          </button>
        </form>
      </div>
    </HomeLayout>
  );
};


export default ForgotPassword;
