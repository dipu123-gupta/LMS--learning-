import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import HomeLayout from "../../Layouts/HomeLayout.jsx";
import { useDispatch } from "react-redux";
import { resetPassword } from "../../Redux/Slices/PasswordSlice.js";


const ResetPassword = () => {
  const { resetToken } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) return;

    const res = await dispatch(resetPassword({ resetToken, password }));

    if (res?.payload?.success) {
      navigate("/login");
    }
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
            Reset Password
          </h1>

          <input
            type="password"
            placeholder="New password"
            className="
              w-full bg-transparent border border-gray-600
              px-3 py-2
              rounded
              text-sm sm:text-base
              focus:outline-none focus:border-yellow-400
            "
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <input
            type="password"
            placeholder="Confirm password"
            className="
              w-full bg-transparent border border-gray-600
              px-3 py-2
              rounded
              text-sm sm:text-base
              focus:outline-none focus:border-yellow-400
            "
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />

          <button
            className="
              w-full bg-yellow-500 hover:bg-yellow-600
              transition
              py-2.5
              rounded
              font-semibold
              text-black
              text-sm sm:text-base
            "
          >
            Reset Password
          </button>
        </form>
      </div>
    </HomeLayout>
  );
};

export default ResetPassword;
