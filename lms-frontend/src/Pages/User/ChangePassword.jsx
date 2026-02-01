import React, { useState } from "react";
import HomeLayout from "../../Layouts/HomeLayout.jsx";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";
import { changePassword } from "../../Redux/Slices/AuthSlice.js";


const ChangePassword = () => {
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    oldPassword: "",
    newPassword: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.oldPassword || !formData.newPassword) {
      toast.error("All fields are required");
      return;
    }

    const res = await dispatch(changePassword(formData));

    if (res?.payload?.success) {
      toast.success("Password changed successfully");
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
            bg-white/10 backdrop-blur-lg
            p-5 sm:p-6
            rounded-xl
            space-y-4
            shadow-[0_0_25px_rgba(0,0,0,0.6)]
          "
        >
          <h1 className="text-xl sm:text-2xl font-bold text-center text-yellow-400">
            Change Password
          </h1>

          <input
            type="password"
            placeholder="Old Password"
            value={formData.oldPassword}
            onChange={(e) =>
              setFormData({ ...formData, oldPassword: e.target.value })
            }
            className="
              w-full p-2 sm:p-3
              rounded-md
              bg-black/40
              text-sm sm:text-base
              focus:outline-none focus:ring-2 focus:ring-yellow-500
            "
          />

          <input
            type="password"
            placeholder="New Password"
            value={formData.newPassword}
            onChange={(e) =>
              setFormData({ ...formData, newPassword: e.target.value })
            }
            className="
              w-full p-2 sm:p-3
              rounded-md
              bg-black/40
              text-sm sm:text-base
              focus:outline-none focus:ring-2 focus:ring-yellow-500
            "
          />

          <button
            type="submit"
            className="
              w-full bg-yellow-500 hover:bg-yellow-400
              transition-all duration-300
              text-black py-2 sm:py-3
              rounded-md font-semibold
            "
          >
            Update Password
          </button>
        </form>
      </div>
    </HomeLayout>
  );
};


export default ChangePassword;
