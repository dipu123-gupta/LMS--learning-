import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { toast } from "react-hot-toast";
import { addCourseLecture } from "../../Redux/Slices/LectureSlice.js";
import HomeLayout from "../../Layouts/HomeLayout.jsx";
import { AiOutlineArrowLeft } from "react-icons/ai";

const AddLecture = () => {
  const location = useLocation();
  const courseDetails = location.state;

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [userInput, setUserInput] = useState({
    id: courseDetails?._id || "",
    lecture: undefined,
    title: "",
    description: "",
    vidioSrc: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserInput({ ...userInput, [name]: value });
  };

  const handleVideo = (e) => {
    const video = e.target.files[0];
    if (!video) return;

    const source = URL.createObjectURL(video);
    setUserInput({
      ...userInput,
      lecture: video,
      vidioSrc: source,
    });
  };

  const onFormSubmit = async (e) => {
    e.preventDefault();

    if (!userInput.lecture || !userInput.title || !userInput.description) {
      toast.error("All fields are mandatory");
      return;
    }

    const response = await dispatch(addCourseLecture(userInput));

    if (response?.payload?.success) {
      toast.success("Lecture added successfully");
      navigate(-1);
    }
  };

  useEffect(() => {
    if (!courseDetails) {
      navigate("/courses");
    }
  }, [courseDetails, navigate]);

  // prevent memory leak
  useEffect(() => {
    return () => {
      if (userInput.vidioSrc) {
        URL.revokeObjectURL(userInput.vidioSrc);
      }
    };
  }, [userInput.vidioSrc]);

  return (
    <HomeLayout>
      <div className="min-h-[90vh] flex items-center justify-center px-4 text-white bg-gradient-to-br from-[#0F172A] to-[#020617]">
        <div
          className="
            w-full max-w-sm sm:max-w-md
            bg-[#0f172a]
            p-4 sm:p-5
            rounded-xl
            shadow-[0_0_15px_black]
            space-y-4
          "
        >
          {/* HEADER */}
          <div className="relative flex items-center justify-center">
            <button
              onClick={() => navigate(-1)}
              className="absolute left-0 text-yellow-400 text-lg sm:text-xl"
            >
              <AiOutlineArrowLeft />
            </button>

            <h1 className="text-lg sm:text-xl font-semibold text-yellow-400">
              Add New Lecture
            </h1>
          </div>

          {/* FORM */}
          <form onSubmit={onFormSubmit} className="flex flex-col gap-3">
            <input
              type="text"
              name="title"
              placeholder="Lecture title"
              value={userInput.title}
              onChange={handleInputChange}
              className="
                bg-transparent border border-gray-600
                px-3 py-2
                rounded
                text-sm sm:text-base
                focus:outline-none focus:border-yellow-400
              "
            />

            <textarea
              name="description"
              placeholder="Lecture description"
              value={userInput.description}
              onChange={handleInputChange}
              className="
                bg-transparent border border-gray-600
                px-3 py-2
                rounded
                h-28 sm:h-32
                resize-none
                text-sm sm:text-base
                focus:outline-none focus:border-yellow-400
              "
            />

            {/* VIDEO PREVIEW / UPLOAD */}
            {userInput.vidioSrc ? (
              <video
                src={userInput.vidioSrc}
                controls
                muted
                className="rounded-lg w-full max-h-48 sm:max-h-56 object-contain"
              />
            ) : (
              <label
                className="
                  border border-dashed border-gray-600
                  rounded-lg
                  h-36 sm:h-40
                  flex items-center justify-center
                  cursor-pointer
                  text-xs sm:text-sm text-gray-300
                  hover:border-yellow-400
                  transition
                "
              >
                Choose Lecture Video
                <input
                  type="file"
                  hidden
                  accept="video/*"
                  onChange={handleVideo}
                />
              </label>
            )}

            <button
              type="submit"
              className="
                bg-yellow-500 hover:bg-yellow-600
                transition
                rounded
                py-2.5
                font-semibold
                text-black
                text-sm sm:text-base
              "
            >
              Add Lecture
            </button>
          </form>
        </div>
      </div>
    </HomeLayout>
  );
};


export default AddLecture;
