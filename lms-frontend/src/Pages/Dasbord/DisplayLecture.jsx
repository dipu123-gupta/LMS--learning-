// import { useLocation, useNavigate } from "react-router-dom";
// import HomeLayout from "../../Layouts/HomeLayout.jsx";
// import React, { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import {
//   deleteCourseLecture,
//   getCourseLecture,
// } from "../../Redux/Slices/LectureSlice.js";

// const DisplayLecture = () => {
//   const navigate = useNavigate();
//   const dispatch = useDispatch();

//   const { state } = useLocation();
//   if (!state) return null;

//   const lectures = useSelector((state) => state.lecture?.lectures || []);
//   const { role } = useSelector((state) => state.auth);
//   const [currentVideo, setCurrentVideo] = useState(0);

//   const onLectureDelete = async (courseId, lectureId) => {
//     await dispatch(deleteCourseLecture({ courseId, lectureId }));
//     await dispatch(getCourseLecture(courseId));
//   };

//   useEffect(() => {
//     if (!state?._id) {
//       navigate("/courses");
//       return;
//     }

//     dispatch(getCourseLecture(state._id));
//   }, [state, dispatch, navigate]);

//   return (
//     <HomeLayout>
//       <div
//         className="
//           flex flex-col gap-8 sm:gap-10
//           items-center justify-center
//           min-h-[90vh]
//           text-white
//           py-6 sm:py-10
//           px-4 sm:px-6 lg:px-10
//         "
//       >
//         {/* Course Title */}
//         <div className="text-center font-semibold text-xl sm:text-2xl mt-12 text-yellow-500">
//           Course Name: {state?.title}
//         </div>

//         {/* CONDITIONAL RENDERING */}
//         {lectures.length > 0 ? (
//           <div
//             className="
//               flex flex-col lg:flex-row
//               justify-center
//               gap-6 lg:gap-10
//               w-full
//             "
//           >
//             {/* VIDEO PLAYER */}
//             <div
//               className="
//                 space-y-4 sm:space-y-5
//                 w-full lg:w-[28rem]
//                 p-2
//                 rounded-lg
//                 shadow-[0_0_10px_black]
//               "
//             >
//               <video
//                 src={lectures[currentVideo]?.lecture?.secure_url}
//                 className="object-fill rounded-tl-lg rounded-tr-lg w-full"
//                 controls
//                 disablePictureInPicture
//                 controlsList="nodownload"
//                 muted
//               />

//               <div className="p-3 sm:p-4 space-y-2 text-sm sm:text-base">
//                 <h2>
//                   <span className="text-yellow-500">Title: </span>
//                   {lectures[currentVideo]?.title}
//                 </h2>

//                 <p>
//                   <span className="text-yellow-500">Description: </span>
//                   {lectures[currentVideo]?.description}
//                 </p>
//               </div>
//             </div>

//             {/* LECTURE LIST */}
//             <ul
//               className="
//                 w-full lg:w-[28rem]
//                 p-3 sm:p-4
//                 rounded-lg
//                 shadow-[0_0_10px_black]
//                 space-y-4
//               "
//             >
//               <li className="font-semibold text-lg sm:text-xl text-yellow-500 flex items-center justify-between">
//                 <p>Lecture List</p>

//                 {role === "admin" && (
//                   <button
//                     onClick={() =>
//                       navigate("/course/addLecture", { state: { ...state } })
//                     }
//                     className="bg-yellow-500 px-2 py-1 rounded-md text-black text-sm sm:text-base font-semibold"
//                   >
//                     Add Lecture
//                   </button>
//                 )}
//               </li>

//               {lectures.map((lecture, index) => (
//                 <li
//                   key={lecture._id}
//                   className="space-y-2 text-sm sm:text-base"
//                 >
//                   <p
//                     className={`cursor-pointer ${
//                       currentVideo === index
//                         ? "text-yellow-400 font-semibold"
//                         : ""
//                     }`}
//                     onClick={() => setCurrentVideo(index)}
//                   >
//                     Lecture {index + 1}: {lecture.title}
//                   </p>

//                   {role === "admin" && (
//                     <button
//                       onClick={() => onLectureDelete(state._id, lecture._id)}
//                       className="bg-red-600 px-2 py-1 rounded-md text-xs sm:text-sm font-semibold"
//                     >
//                       Delete Lecture
//                     </button>
//                   )}
//                 </li>
//               ))}
//             </ul>
//           </div>
//         ) : (
//           role === "admin" && (
//             <button
//               onClick={() =>
//                 navigate("/course/addLecture", { state: { ...state } })
//               }
//               className="bg-yellow-500 px-4 py-2 rounded-md text-black font-semibold"
//             >
//               Add Lecture
//             </button>
//           )
//         )}
//       </div>
//     </HomeLayout>
//   );
// };

// export default DisplayLecture;
import { useLocation, useNavigate } from "react-router-dom";
import HomeLayout from "../../Layouts/HomeLayout.jsx";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteCourseLecture,
  getCourseLecture,
  markLectureCompleted,
  updateLastWatchedLecture,
} from "../../Redux/Slices/LectureSlice.js";
import { getUserData } from "../../Redux/Slices/AuthSlice.js";

const DisplayLecture = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { state } = useLocation();
  if (!state) return null;

  const lectures = useSelector((state) => state.lecture?.lectures || []);
  const { role, data: user } = useSelector((state) => state.auth);

  const [currentVideo, setCurrentVideo] = useState(0);

  const onLectureDelete = async (courseId, lectureId) => {
    await dispatch(deleteCourseLecture({ courseId, lectureId }));
    await dispatch(getCourseLecture(courseId));
  };

  /* ======================
     LOAD LECTURES
  ======================= */
  useEffect(() => {
    if (!state?._id) {
      navigate("/courses");
      return;
    }
    dispatch(getCourseLecture(state._id));
  }, [state, dispatch, navigate]);

 
 
  /* ======================
     RESUME LAST WATCHED
  ======================= */
  useEffect(() => {
    const progress = user?.progress?.find(
      (p) => String(p.courseId) === String(state._id)
    );

    if (progress?.lastWatchedLecture && lectures.length > 0) {
      const index = lectures.findIndex(
        (l) => String(l._id) === String(progress.lastWatchedLecture)
      );
      if (index !== -1) setCurrentVideo(index);
    }
  }, [lectures, user, state._id]);

  return (
    <HomeLayout>
      <div className="flex flex-col gap-8 items-center min-h-[90vh] text-white py-10 px-4">
        <div className="text-center font-semibold text-2xl mt-12 text-yellow-500">
          Course Name: {state?.title}
        </div>

        {lectures.length > 0 ? (
          <div className="flex flex-col lg:flex-row gap-10 w-full justify-center">
            {/* VIDEO PLAYER */}
            <div className="w-full lg:w-[28rem] p-2 rounded-lg shadow-[0_0_10px_black]">
              <video
                src={lectures[currentVideo]?.lecture?.secure_url}
                className="w-full rounded"
                controls
                muted
                onPause={() =>
                  dispatch(
                    updateLastWatchedLecture({
                      courseId: state._id,
                      lectureId: lectures[currentVideo]._id,
                    })
                  )
                }
                onEnded={async () => {
                  console.log("LECTURE ENDED 🔥");

                  await dispatch(
                    markLectureCompleted({
                      courseId: state._id,
                      lectureId: lectures[currentVideo]._id,
                    })
                  );

                  await dispatch(
                    updateLastWatchedLecture({
                      courseId: state._id,
                      lectureId: lectures[currentVideo]._id,
                    })
                  );

                  await dispatch(getUserData());
                  console.log("USER DATA REFRESHED ✅");
                }}
              />

              <div className="p-4">
                <h2 className="text-yellow-400 font-semibold">
                  {lectures[currentVideo]?.title}
                </h2>
                <p>{lectures[currentVideo]?.description}</p>
              </div>
            </div>

            {/* LECTURE LIST */}
            <ul className="w-full lg:w-[28rem] p-4 rounded-lg shadow-[0_0_10px_black] space-y-4">
              <li className="font-semibold text-xl text-yellow-500">
                Lecture List
              </li>

              {lectures.map((lecture, index) => (
                <li key={lecture._id}>
                  <p
                    className={`cursor-pointer ${
                      currentVideo === index ? "text-yellow-400 font-semibold" : ""
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
                      className="bg-red-600 px-2 py-1 rounded text-xs mt-1"
                    >
                      Delete
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
              className="bg-yellow-500 px-4 py-2 rounded text-black font-semibold"
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
