import { useLocation, useNavigate } from "react-router-dom";
import HomeLayout from "../../Layouts/HomeLayout.jsx";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteCourseLecture,
  getCourseLecture,
} from "../../Redux/Slices/LectureSlice.js";

const DisplayLecture = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { state } = useLocation();

  const lectures = useSelector(
    (state) => state.lecture?.lectures || []
  );

  const { role } = useSelector((state) => state.auth);

  const [currentVideo, setCurrentVideo] = useState(0);

  const onLectureDelete = async (courseId, lectureId) => {
    await dispatch(deleteCourseLecture({ courseId, lectureId }));
    await dispatch(getCourseLecture(courseId));
  };

  useEffect(() => {
    if (!state?._id) {
      navigate("/courses");
      return;
    }

    dispatch(getCourseLecture(state._id));
  }, [state, dispatch, navigate]);

  return (
    <HomeLayout>
      <div className="flex flex-col gap-10 items-center justify-center min-h-[90vh] text-white py-10 mx-10">

        {/* Course Title */}
        <div className="text-center font-semibold text-2xl text-yellow-500">
          Course Name: {state?.title}
        </div>

        {/*  FIXED CONDITIONAL RENDERING */}
        {lectures.length > 0 ? (
          <div className="flex justify-center gap-10 w-full">

            {/* VIDEO PLAYER */}
            <div className="space-y-5 w-[28rem] p-2 rounded-lg shadow-[0_0_10px_black]">
              <video
                src={lectures[currentVideo]?.lecture?.secure_url}
                className="object-fill rounded-tl-lg rounded-tr-lg w-full"
                controls
                disablePictureInPicture
                controlsList="nodownload"
                muted
              />

              <div className="p-4 space-y-2">
                <h2>
                  <span className="text-yellow-500">Title: </span>
                  {lectures[currentVideo]?.title}
                </h2>

                <p>
                  <span className="text-yellow-500">Description: </span>
                  {lectures[currentVideo]?.description}
                </p>
              </div>
            </div>

            {/* LECTURE LIST */}
            <ul className="w-[28rem] p-2 rounded-lg shadow-[0_0_10px_black] space-y-4">
              <li className="font-semibold text-xl text-yellow-500 flex items-center justify-between">
                <p>Lecture List</p>

                {role === "admin" && (
                  <button
                    onClick={() =>
                      navigate("/course/addLecture", { state: { ...state } })
                    }
                    className="bg-yellow-500 px-2 py-1 rounded-md text-black font-semibold"
                  >
                    Add Lecture
                  </button>
                )}
              </li>

              {lectures.map((lecture, index) => (
                <li key={lecture._id} className="space-y-2">
                  <p
                    className={`cursor-pointer ${
                      currentVideo === index
                        ? "text-yellow-400 font-semibold"
                        : ""
                    }`}
                    onClick={() => setCurrentVideo(index)}
                  >
                    Lecture {index + 1}: {lecture.title}
                  </p>

                  {role === "admin" && (
                    <button
                      onClick={() =>
                        onLectureDelete(state._id, lecture._id)
                      }
                      className="bg-red-600 px-2 py-1 rounded-md text-sm font-semibold"
                    >
                      Delete Lecture
                    </button>
                  )}
                </li>
              ))}
            </ul>
          </div>
        ) : (
          role === "admin" && (
            <button
              onClick={() =>
                navigate("/course/addLecture", { state: { ...state } })
              }
              className="bg-yellow-500 px-4 py-2 rounded-md text-black font-semibold"
            >
              Add Lecture
            </button>
          )
        )}
      </div>
    </HomeLayout>
  );
};

export default DisplayLecture;
