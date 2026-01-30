import HomeLayout from "../../Layouts/HomeLayout.jsx";
import React from "react";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";

const CourseDescription = () => {
  const { state } = useLocation(); // course data
  const navigate = useNavigate();

  // auth state
  const { role, data: user } = useSelector((state) => state.auth);

  // current course id
  const courseId = state?._id;

  // COURSE-WISE ACCESS CHECK
  const hasAccess =
    role === "admin" ||
    user?.subscribedCourses?.some((id) => id.toString() === courseId);

  return (
    <HomeLayout>
      <div className="min-h-[90vh] pt-12 px-10 flex items-center justify-center text-white">
        <div className="grid grid-cols-2 gap-10 py-10 px-10 rounded-2xl bg-gradient-to-br from-[#1A2238] to-[#0F172A] shadow-2xl border border-gray-700 max-w-6xl w-full">
          {/* ================= LEFT CARD ================= */}
          <div className="space-y-6 bg-[#111827] p-6 rounded-xl shadow-lg border border-gray-700">
            <img
              src={state?.thumbnail?.secure_url}
              alt="thumbnail"
              className="w-full h-64 object-cover rounded-xl border border-gray-600"
            />

            <div className="space-y-2 text-center">
              <p className="font-semibold">
                <span className="text-yellow-400">Total Lectures:</span>{" "}
                {state?.numberOfLectures}
              </p>

              <p className="font-semibold">
                <span className="text-yellow-400">Instructor:</span>{" "}
                {state?.createdBy}
              </p>
            </div>

            {/* ================= ACTION BUTTON ================= */}
            {hasAccess ? (
              <button
                onClick={() =>
                  navigate("/course/display-lectures", {
                    state: { ...state },
                  })
                }
                className="w-full bg-yellow-500 hover:bg-yellow-400 text-black text-lg font-bold py-3 rounded-lg transition-all"
              >
                Watch Lectures ▶
              </button>
            ) : (
              <button
                onClick={() =>
                  navigate("/checkout", {
                    state: { courseId },
                  })
                }
                className="w-full bg-green-600 hover:bg-green-500 text-white text-lg font-bold py-3 rounded-lg transition-all"
              >
                Buy This Course 💳
              </button>
            )}
          </div>

          {/* ================= RIGHT CARD ================= */}
          <div className="space-y-4 bg-[#111827] p-8 rounded-xl shadow-lg border border-gray-700">
            <h1 className="text-4xl font-extrabold text-yellow-400 text-center">
              {state?.title}
            </h1>

            <p className="text-yellow-400 font-semibold text-lg">
              Course Description
            </p>

            <p className="text-gray-300 leading-relaxed">
              {state?.description}
            </p>

            {/* <h2 className="text-2xl font-bold text-yellow-400">
              {state?.price === 0 ? "Free Course" : `Price: ₹ ${state.price}`}
            </h2> */}

            {/*  ACCESS INFO */}
            {!hasAccess && role !== "admin" && (
              <p className="text-red-400 font-semibold mt-4">
                ⚠ You are not subscribed to this course
              </p>
            )}
          </div>
        </div>
      </div>
    </HomeLayout>
  );
};

export default CourseDescription;
