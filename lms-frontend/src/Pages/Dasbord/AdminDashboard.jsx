import {
  Chart,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
} from "chart.js";
import HomeLayout from "../../Layouts/HomeLayout.jsx";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { FcSalesPerformance } from "react-icons/fc";
import { GiMoneyStack } from "react-icons/gi";
import { getPaymentStats } from "../../Redux/Slices/RazorpaySlice.js";
import { getStateData } from "../../Redux/Slices/StatSlice.js";
import {
  deleteCourses,
  getAllCourses,
} from "../../Redux/Slices/CourseSlice.js";
import { Bar, Pie } from "react-chartjs-2";
import { FaUsers } from "react-icons/fa";
import { BsCollectionPlayFill, BsTrash } from "react-icons/bs";

Chart.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
);


const AdminDashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  /* =======================
     REDUX DATA
  ======================== */
  const { allUserCount = 0, subscribeCount = 0 } = useSelector(
    (state) => state.stat || {}
  );

  const {
    monthlySalesRecod = [],
    monthlyRevenue = [],
    totalRevenue = 0,
  } = useSelector((state) => state.razorpay || {});

  const myCourses = useSelector((state) => state.Courses?.courseData || []);

  /* =======================
     PIE CHART (USERS)
  ======================== */
  const userData = {
    labels: ["Registered Users", "Subscribed Users"],
    datasets: [
      {
        label: "User Details",
        data: [allUserCount, subscribeCount],
        backgroundColor: ["#facc15", "#22c55e"],
        borderWidth: 1,
      },
    ],
  };

  /* =======================
     BAR CHART (SALES)
  ======================== */
  const salesData = {
    labels: [
      "Jan","Feb","Mar","Apr","May","Jun",
      "Jul","Aug","Sep","Oct","Nov","Dec",
    ],
    datasets: [
      {
        label: "Revenue / Month",
        data: monthlyRevenue?.length
          ? monthlyRevenue
          : new Array(12).fill(0),
        backgroundColor: "#f87171",
        borderWidth: 2,
      },
    ],
  };

  /* =======================
     DELETE COURSE
  ======================== */
  const onCourseDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete the course ?")) {
      const res = await dispatch(deleteCourses(id));
      if (res?.payload) {
        dispatch(getAllCourses());
      }
    }
  };

  /* =======================
     LOAD DATA
  ======================== */
  useEffect(() => {
    dispatch(getAllCourses());
    dispatch(getStateData());
    dispatch(getPaymentStats());
  }, [dispatch]);

  return (
    <HomeLayout>
      <div className="min-h-[90vh] px-4 sm:px-6 lg:px-10 pt-6 flex flex-col gap-10 text-white">

        <h1 className="text-center text-3xl mt-12 sm:text-4xl lg:text-5xl font-semibold text-yellow-500">
          Admin Dashboard
        </h1>

        {/* ================= DASHBOARD STATS ================= */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-10">

          {/* LEFT */}
          <div className="flex flex-col items-center gap-8 shadow-lg rounded-md p-4 sm:p-5">
            <div className="w-64 h-64 sm:w-72 sm:h-72 lg:w-80 lg:h-80">
              <Pie data={userData} />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
              <div className="flex items-center justify-between p-4 shadow-md rounded-md">
                <div>
                  <p className="text-sm">Registered Users</p>
                  <p className="text-3xl sm:text-4xl font-bold">
                    {allUserCount}
                  </p>
                </div>
                <FaUsers className="text-yellow-400 text-4xl sm:text-5xl" />
              </div>

              <div className="flex items-center justify-between p-4 shadow-md rounded-md">
                <div>
                  <p className="text-sm">Subscribed Users</p>
                  <p className="text-3xl sm:text-4xl font-bold">
                    {subscribeCount}
                  </p>
                </div>
                <FaUsers className="text-green-400 text-4xl sm:text-5xl" />
              </div>
            </div>
          </div>

          {/* RIGHT */}
          <div className="flex flex-col items-center gap-8 shadow-lg rounded-md p-4 sm:p-5">
            <div className="w-full h-64 sm:h-72 lg:h-80">
              <Bar data={salesData} />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
              <div className="flex items-center justify-between p-4 shadow-md rounded-md">
                <div>
                  <p className="text-sm">Subscription Count</p>
                  <p className="text-3xl sm:text-4xl font-bold">
                    {monthlySalesRecod.reduce((a, b) => a + b, 0)}
                  </p>
                </div>
                <FcSalesPerformance className="text-4xl sm:text-5xl" />
              </div>

              <div className="flex items-center justify-between p-4 shadow-md rounded-md">
                <div>
                  <p className="text-sm">Total Revenue</p>
                  <p className="text-3xl sm:text-4xl font-bold">
                    ₹ {totalRevenue || 0}
                  </p>
                </div>
                <GiMoneyStack className="text-4xl sm:text-5xl" />
              </div>
            </div>
          </div>
        </div>

        {/* ================= COURSE OVERVIEW ================= */}
        <div className="w-full mt-6">

          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
            <h2 className="text-2xl sm:text-3xl font-semibold">
              Course Overview
            </h2>

            <button
              onClick={() => navigate("/course/create")}
              className="bg-yellow-500 px-4 py-2 rounded font-semibold text-black w-fit"
            >
              Create New Course
            </button>
          </div>

          {/* ===== DESKTOP TABLE ===== */}
          <div className="hidden lg:block overflow-x-auto">
            <table className="table w-full text-sm">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Title</th>
                  <th>Category</th>
                  <th>Instructor</th>
                  <th>Lectures</th>
                  <th>Description</th>
                  <th>Actions</th>
                </tr>
              </thead>

              <tbody>
                {myCourses.map((course, idx) => (
                  <tr key={course._id}>
                    <td>{idx + 1}</td>
                    <td>{course.title}</td>
                    <td>{course.category}</td>
                    <td>{course.createdBy}</td>
                    <td>{course.numberOfLectures}</td>
                    <td className="max-w-xs truncate">
                      {course.description}
                    </td>
                    <td className="flex gap-3">
                      <button
                        onClick={() =>
                          navigate("/course/display-lectures", {
                            state: { ...course },
                          })
                        }
                        className="bg-green-500 p-2 rounded"
                      >
                        <BsCollectionPlayFill />
                      </button>

                      <button
                        onClick={() => onCourseDelete(course._id)}
                        className="bg-red-500 p-2 rounded"
                      >
                        <BsTrash />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* ===== MOBILE / TABLET CARDS ===== */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:hidden">
            {myCourses.map((course, idx) => (
              <div
                key={course._id}
                className="bg-[#111827] border border-gray-700 rounded-xl p-4 shadow-md flex flex-col gap-3"
              >
                <div className="flex justify-between items-center">
                  <h3 className="font-semibold text-lg text-yellow-400">
                    {course.title}
                  </h3>
                  <span className="text-xs text-gray-400">#{idx + 1}</span>
                </div>

                <p className="text-sm text-gray-300">
                  <span className="text-yellow-400 font-semibold">
                    Category:
                  </span>{" "}
                  {course.category}
                </p>

                <p className="text-sm text-gray-300">
                  <span className="text-yellow-400 font-semibold">
                    Instructor:
                  </span>{" "}
                  {course.createdBy}
                </p>

                <p className="text-sm text-gray-300">
                  <span className="text-yellow-400 font-semibold">
                    Lectures:
                  </span>{" "}
                  {course.numberOfLectures}
                </p>

                <p className="text-xs text-gray-400 line-clamp-2">
                  {course.description}
                </p>

                <div className="flex gap-3 mt-2">
                  <button
                    onClick={() =>
                      navigate("/course/display-lectures", {
                        state: { ...course },
                      })
                    }
                    className="flex-1 bg-green-500 py-2 rounded font-semibold flex items-center justify-center gap-2"
                  >
                    <BsCollectionPlayFill />
                    View
                  </button>

                  <button
                    onClick={() => onCourseDelete(course._id)}
                    className="flex-1 bg-red-500 py-2 rounded font-semibold flex items-center justify-center gap-2"
                  >
                    <BsTrash />
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </HomeLayout>
  );
};



export default AdminDashboard;
