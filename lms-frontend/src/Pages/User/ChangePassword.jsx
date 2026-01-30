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
    }
  };

  return (
    <HomeLayout>
      <div className="min-h-[90vh] flex items-center justify-center text-white">
        <form
          onSubmit={handleSubmit}
          className="bg-white/10 p-6 rounded-xl w-96 space-y-4"
        >
          <h1 className="text-2xl font-bold text-center">Change Password</h1>

          <input
            type="password"
            placeholder="Old Password"
            value={formData.oldPassword}
            onChange={(e) =>
              setFormData({ ...formData, oldPassword: e.target.value })
            }
            className="w-full p-2 rounded bg-black/40"
          />

          <input
            type="password"
            placeholder="New Password"
            value={formData.newPassword}
            onChange={(e) =>
              setFormData({ ...formData, newPassword: e.target.value })
            }
            className="w-full p-2 rounded bg-black/40"
          />

          <button
            type="submit"
            className="w-full bg-yellow-500 text-black py-2 rounded font-semibold"
          >
            Update Password
          </button>
        </form>
      </div>
    </HomeLayout>
  );
};

export default ChangePassword;
