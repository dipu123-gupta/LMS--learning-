import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { getUserData, updateProfile } from "../../Redux/Slices/AuthSlice.js";
import { useNavigate } from "react-router";
import HomeLayout from "../../Layouts/HomeLayout.jsx";
import { BsPersonCircle } from "react-icons/bs";
import { Link } from "react-router-dom";
import { AiOutlineArrowLeft } from "react-icons/ai";

const EditProfile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userData = useSelector((state) => state?.auth?.data);
  const userId = userData?._id;

  const [data, setData] = useState({
    previewImage: "",
    name: "",
    avatar: "",
  });

  /*  LOAD EXISTING USER DATA */
  useEffect(() => {
    if (userData) {
      setData((prev) => ({
        ...prev,
        name: userData?.name || "",
        previewImage: userData?.avatar?.secure_url || "",
      }));
    }
  }, [userData]);

  const handleImageUpload = (e) => {
    const uploadImage = e.target.files[0];
    if (uploadImage) {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(uploadImage);

      fileReader.onload = () => {
        setData((prev) => ({
          ...prev,
          previewImage: fileReader.result,
          avatar: uploadImage,
        }));
      };
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const onFormSubmit = async (e) => {
    e.preventDefault();

    if (!data.name) {
      toast.error("Name is required");
      return;
    }

    if (data.name.length < 5) {
      toast.error("Name must be at least 5 characters");
      return;
    }

    const formData = new FormData();
    formData.append("name", data.name);

    if (data.avatar) {
      formData.append("avatar", data.avatar);
    }

    await dispatch(updateProfile({ id: userId, formData }));
    await dispatch(getUserData());

    navigate("/user/profile");
  };

  return (
    <HomeLayout>
      <div className="flex items-center justify-center min-h-[90vh] bg-gradient-to-br from-[#0F172A] to-[#020617]">
        <form
          onSubmit={onFormSubmit}
          className="w-[22rem] bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 text-white shadow-[0_0_30px_rgba(0,0,0,0.7)] flex flex-col gap-5"
        >
          <h1 className="text-center text-2xl font-bold text-yellow-400">
            Edit Profile
          </h1>

          {/* AVATAR */}
          <label htmlFor="image_uploads" className="cursor-pointer">
            {data.previewImage ? (
              <img
                src={data.previewImage}
                alt="preview"
                className="w-28 h-28 object-cover rounded-full mx-auto border-4 border-yellow-500 shadow-lg hover:scale-105 transition"
              />
            ) : (
              <BsPersonCircle className="w-28 h-28 mx-auto text-gray-400" />
            )}
          </label>

          <input
            type="file"
            id="image_uploads"
            accept=".jpg,.jpeg,.png"
            onChange={handleImageUpload}
            className="text-sm text-gray-300"
          />

          {/* NAME */}
          <div className="flex flex-col gap-2">
            <label className="font-semibold text-gray-300">Full Name</label>
            <input
              type="text"
              name="name"
              value={data.name}
              onChange={handleInputChange}
              placeholder="Enter your name"
              className="bg-transparent border border-gray-600 rounded-md
                         px-3 py-2 focus:outline-none focus:border-yellow-500"
            />
          </div>

          {/* BUTTON */}
          <button
            type="submit"
            className="w-full bg-yellow-600 hover:bg-yellow-500 transition-all duration-300 rounded-md py-2 font-semibold text-black"
          >
            Update Profile
          </button>

          {/* BACK */}
          <Link
            to="/user/profile"
            className="flex items-center justify-center gap-2 text-sm text-yellow-400 hover:underline"
          >
            <AiOutlineArrowLeft />
            Go back to profile
          </Link>
        </form>
      </div>
    </HomeLayout>
  );
};

export default EditProfile;
