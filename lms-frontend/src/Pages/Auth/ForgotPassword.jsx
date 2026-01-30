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
      <div className="min-h-[90vh] flex items-center justify-center text-white">
        <form
          onSubmit={handleSubmit}
          className="w-96 bg-[#0f172a] p-6 rounded-xl space-y-4"
        >
          <h1 className="text-xl font-bold text-center text-yellow-400">
            Forgot Password
          </h1>

          <input
            type="email"
            placeholder="Enter registered email"
            className="w-full bg-transparent border px-3 py-2 rounded"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <button className="w-full bg-yellow-500 py-2 rounded font-semibold">
            Send Reset Link
          </button>
        </form>
      </div>
    </HomeLayout>
  );
};

export default ForgotPassword;
