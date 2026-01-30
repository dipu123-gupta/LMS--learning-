import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import HomeLayout from "../../Layouts/HomeLayout.jsx";
import { useDispatch } from "react-redux";
import { resetPassword } from "../../Redux/Slices/PasswordSlice.js";

const ResetPassword = () => {
  const { token } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) return;

    const res = await dispatch(resetPassword({ token, password }));

    if (res?.payload?.success) {
      navigate("/login");
    }
  };

  return (
    <HomeLayout>
      <div className="min-h-[90vh] flex items-center justify-center text-white">
        <form
          onSubmit={handleSubmit}
          className="w-96 bg-[#0f172a] p-6 rounded-xl space-y-4"
        >
          <h1 className="text-xl font-bold text-center text-yellow-400">
            Reset Password
          </h1>

          <input
            type="password"
            placeholder="New password"
            className="w-full bg-transparent border px-3 py-2 rounded"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <input
            type="password"
            placeholder="Confirm password"
            className="w-full bg-transparent border px-3 py-2 rounded"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />

          <button className="w-full bg-yellow-500 py-2 rounded font-semibold">
            Reset Password
          </button>
        </form>
      </div>
    </HomeLayout>
  );
};

export default ResetPassword;
