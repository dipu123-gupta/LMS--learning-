// import HomeLayout from "../../Layouts/HomeLayout.jsx";
// import React from "react";
// import { useSelector } from "react-redux";
// import { useLocation, useNavigate } from "react-router-dom";
// import { useEffect } from "react";

// const CourseDescription = () => {
//   const { state } = useLocation();
//   const navigate = useNavigate();

//   useEffect(() => {
//     if (!state) {
//       navigate("/courses");
//     }
//   }, [state, navigate]);

//   if (!state) return null;

//   const { role, data: user } = useSelector((state) => state.auth);
//   const courseId = state?._id;

//   const hasAccess =
//     role === "admin" ||
//     user?.subscribedCourses?.some((id) => id.toString() === courseId);

//   return (
//     <HomeLayout>
//       <div className="min-h-[90vh] pt-8 sm:pt-12 px-4 sm:px-6 lg:px-10 flex items-center justify-center text-white">
//         <div
//           className="
//             grid grid-cols-1 lg:grid-cols-2
//             gap-6 sm:gap-8 lg:gap-10
//             py-6 sm:py-8 lg:py-10
//             px-4 sm:px-6 lg:px-10
//             rounded-2xl
//             bg-gradient-to-br from-[#1A2238] to-[#0F172A]
//             shadow-2xl border border-gray-700
//             max-w-6xl w-full
//           "
//         >
//           {/* ================= LEFT CARD ================= */}
//           <div className="space-y-5 bg-[#111827] p-4 sm:p-6 rounded-xl shadow-lg border border-gray-700">
//             <img
//               src={state?.thumbnail?.secure_url}
//               alt="thumbnail"
//               className="
//                 w-full h-48 sm:h-56 lg:h-64
//                 object-cover rounded-xl
//                 border border-gray-600
//               "
//             />

//             <div className="space-y-2 text-center text-sm sm:text-base">
//               <p className="font-semibold">
//                 <span className="text-yellow-400">Total Lectures:</span>{" "}
//                 {state?.numberOfLectures}
//               </p>

//               <p className="font-semibold">
//                 <span className="text-yellow-400">Instructor:</span>{" "}
//                 {state?.createdBy}
//               </p>
//             </div>

//             {/* ================= ACTION BUTTON ================= */}
//             {hasAccess ? (
//               <button
//                 onClick={() =>
//                   navigate("/course/display-lectures", {
//                     state: { ...state },
//                   })
//                 }
//                 className="
//                   w-full bg-yellow-500 hover:bg-yellow-400
//                   text-black
//                   text-base sm:text-lg
//                   font-bold
//                   py-2.5 sm:py-3
//                   rounded-lg
//                   transition-all
//                 "
//               >
//                 Watch Lectures ▶
//               </button>
//             ) : (
//               <button
//                 onClick={() =>
//                   navigate("/checkout", {
//                     state: { courseId },
//                   })
//                 }
//                 className="
//                   w-full bg-green-600 hover:bg-green-500
//                   text-white
//                   text-base sm:text-lg
//                   font-bold
//                   py-2.5 sm:py-3
//                   rounded-lg
//                   transition-all
//                 "
//               >
//                 Buy This Course 💳
//               </button>
//             )}
//           </div>

//           {/* ================= RIGHT CARD ================= */}
//           <div className="space-y-4 bg-[#111827] p-5 sm:p-6 lg:p-8 rounded-xl shadow-lg border border-gray-700">
//             <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-yellow-400 text-center">
//               {state?.title}
//             </h1>

//             <p className="text-yellow-400 font-semibold text-base sm:text-lg">
//               Course Description
//             </p>

//             <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
//               {state?.description}
//             </p>

//             {/* ACCESS INFO */}
//             {!hasAccess && role !== "admin" && (
//               <p className="text-red-400 font-semibold mt-4 text-sm sm:text-base">
//                 ⚠ You are not subscribed to this course
//               </p>
//             )}
//           </div>
//         </div>
//       </div>
//     </HomeLayout>
//   );
// };

// export default CourseDescription;

import HomeLayout from "../../Layouts/HomeLayout.jsx";
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { getCourseLecture } from "../../Redux/Slices/LectureSlice.js";
import { addCourseReview } from "../../Redux/Slices/CourseSlice.js";

const CourseDescription = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  useEffect(() => {
    if (!state) {
      navigate("/courses");
    }
  }, [state, navigate]);

  if (!state) return null;

  const { role, data: user } = useSelector((state) => state.auth);
  const lectures = useSelector((state) => state.lecture?.lectures || []);

  const courseId = state?._id;

  /* ======================
     ACCESS CHECK
  ======================= */
  const hasAccess =
    role === "admin" ||
    user?.subscribedCourses?.some((id) => id.toString() === courseId);

  /* ======================
     LOAD LECTURES (for progress)
  ======================= */
  useEffect(() => {
    if (hasAccess) {
      dispatch(getCourseLecture(courseId));
    }
  }, [dispatch, courseId, hasAccess]);

  /* ======================
     ✅ COURSE PROGRESS FIX
  ======================= */
 const progressObj = user?.progress?.find(
  (p) => String(p.courseId) === String(state?._id)
);

console.log("MATCHING COURSE ID 👉", state?._id);
console.log("ALL PROGRESS IDS 👉", user?.progress?.map(p => String(p.courseId)));


  console.log("USER PROGRESS 👉", user?.progress);
  console.log("CURRENT COURSE PROGRESS 👉", progressObj);

  const completedLectures = progressObj?.completedLectures || [];
  const totalLectures = state?.numberOfLectures || 0;

  const progressPercent =
    totalLectures > 0
      ? Math.round((completedLectures.length / totalLectures) * 100)
      : 0;

  /* ======================
     ✅ REVIEW SUBMIT FIX
  ======================= */
  const submitReviewHandler = () => {
    if (!rating || !comment.trim()) {
      alert("Please select rating and write review");
      return;
    }

    dispatch(
      addCourseReview({
        courseId,
        rating,
        comment,
      }),
    );

    setRating(0);
    setComment("");
  };

  return (
    <HomeLayout>
      <div className="min-h-[90vh] pt-8 sm:pt-12 px-4 sm:px-6 lg:px-10 flex items-center justify-center text-white">
        <div
          className="
            grid grid-cols-1 lg:grid-cols-2
            gap-6 sm:gap-8 lg:gap-10
            py-6 sm:py-8 lg:py-10
            px-4 sm:px-6 lg:px-10
            rounded-2xl
            bg-gradient-to-br from-[#1A2238] to-[#0F172A]
            shadow-2xl border border-gray-700
            max-w-6xl w-full
          "
        >
          {/* ================= LEFT CARD ================= */}
          <div className="space-y-5 bg-[#111827] p-4 sm:p-6 rounded-xl shadow-lg border border-gray-700">
            <img
              src={state?.thumbnail?.secure_url}
              alt="thumbnail"
              className="
                w-full h-48 sm:h-56 lg:h-64
                object-cover rounded-xl
                border border-gray-600
              "
            />

            <div className="space-y-2 text-center text-sm sm:text-base">
              <p className="font-semibold">
                <span className="text-yellow-400">Total Lectures:</span>{" "}
                {state?.numberOfLectures}
              </p>

              <p className="font-semibold">
                <span className="text-yellow-400">Instructor:</span>{" "}
                {state?.createdBy}
              </p>
            </div>

            {/* ================= PROGRESS BAR ================= */}
            {hasAccess && role !== "admin" && (
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-yellow-400 font-semibold">
                    Course Progress
                  </span>
                  <span>{progressPercent}%</span>
                </div>

                <div className="w-full bg-gray-700 rounded-full h-2">
                  <div
                    className="bg-yellow-400 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${progressPercent}%` }}
                  />
                </div>
              </div>
            )}

            {/* ================= ACTION BUTTON ================= */}
            {hasAccess ? (
              <button
                onClick={() =>
                  navigate("/course/display-lectures", {
                    state: { ...state },
                  })
                }
                className="
                  w-full bg-yellow-500 hover:bg-yellow-400
                  text-black font-bold py-3 rounded-lg
                "
              >
                {progressPercent > 0 ? "Resume Course ▶" : "Start Course ▶"}
              </button>
            ) : (
              <button
                onClick={() =>
                  navigate("/checkout", {
                    state: { courseId },
                  })
                }
                className="
                  w-full bg-green-600 hover:bg-green-500
                  text-white font-bold py-3 rounded-lg
                "
              >
                Buy This Course 💳
              </button>
            )}

            {/* ================= CERTIFICATE ================= */}
            {progressPercent === 100 && (
              <button
                onClick={() => navigate("/certificate", { state })}
                className="w-full mt-3 bg-green-500 text-black font-bold py-2 rounded"
              >
                Download Certificate 🎓
              </button>
            )}
          </div>

          {/* ================= RIGHT CARD ================= */}
          <div className="space-y-4 bg-[#111827] p-5 sm:p-6 lg:p-8 rounded-xl shadow-lg border border-gray-700">
            <h1 className="text-3xl font-extrabold text-yellow-400 text-center">
              {state?.title}
            </h1>

            <p className="text-yellow-400 font-semibold">Course Description</p>

            <p className="text-gray-300 leading-relaxed">
              {state?.description}
            </p>

            {!hasAccess && role !== "admin" && (
              <p className="text-red-400 font-semibold">
                ⚠ You are not subscribed to this course
              </p>
            )}

            {/* ================= REVIEW SECTION ================= */}
            {hasAccess && role !== "admin" && (
              <div className="mt-6 border-t border-gray-600 pt-4 space-y-3">
                <h3 className="text-yellow-400 font-semibold text-lg">
                  Leave a Review ⭐
                </h3>

                <select
                  value={rating}
                  className="w-full bg-black/40 p-2 rounded"
                  onChange={(e) => setRating(Number(e.target.value))}
                >
                  <option value={0}>Select Rating</option>
                  {[1, 2, 3, 4, 5].map((r) => (
                    <option key={r} value={r}>
                      {r} ⭐
                    </option>
                  ))}
                </select>

                <textarea
                  value={comment}
                  className="w-full bg-black/40 p-2 rounded"
                  rows="3"
                  placeholder="Write your review..."
                  onChange={(e) => setComment(e.target.value)}
                />

                <button
                  onClick={submitReviewHandler}
                  className="bg-yellow-500 hover:bg-yellow-400 text-black font-bold px-4 py-2 rounded"
                >
                  Submit Review
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </HomeLayout>
  );
};

export default CourseDescription;
