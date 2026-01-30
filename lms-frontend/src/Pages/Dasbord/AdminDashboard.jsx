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
    (state) => state.stat || {},
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
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
    datasets: [
      {
        label: "Revenue / Month",
        data: monthlyRevenue?.length ? monthlyRevenue : new Array(12).fill(0),
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
     LOAD DATA ONCE
  ======================== */
  useEffect(() => {
    dispatch(getAllCourses());
    dispatch(getStateData());
    dispatch(getPaymentStats());
  }, [dispatch]);

  return (
    <HomeLayout>
      <div className="min-h-[90vh] pt-5 flex flex-col gap-10 text-white">
        <h1 className="text-center text-5xl font-semibold text-yellow-500">
          Admin Dashboard
        </h1>

        {/* ================= DASHBOARD STATS ================= */}
        <div className="grid grid-cols-2 gap-5 mx-10">
          {/* LEFT */}
          <div className="flex flex-col items-center gap-10 shadow-lg rounded-md p-5">
            <div className="w-80 h-80">
              <Pie data={userData} />
            </div>

            <div className="grid grid-cols-2 gap-5 w-full">
              <div className="flex items-center justify-between p-5 shadow-md rounded-md">
                <div>
                  <p>Registered Users</p>
                  <p className="text-4xl font-bold">{allUserCount}</p>
                </div>
                <FaUsers className="text-yellow-400 text-5xl" />
              </div>

              <div className="flex items-center justify-between p-5 shadow-md rounded-md">
                <div>
                  <p>Subscribed Users</p>
                  <p className="text-4xl font-bold">{subscribeCount}</p>
                </div>
                <FaUsers className="text-green-400 text-5xl" />
              </div>
            </div>
          </div>

          {/* RIGHT */}
          <div className="flex flex-col items-center gap-10 shadow-lg rounded-md p-5">
            <div className="w-full h-80">
              <Bar data={salesData} />
            </div>

            <div className="grid grid-cols-2 gap-5 w-full">
              <div className="flex items-center justify-between p-5 shadow-md rounded-md">
                <div>
                  <p>Subscription Count</p>
                  <p className="text-4xl font-bold">
                    {monthlySalesRecod?.reduce((a, b) => a + b, 0)}
                  </p>
                </div>
                <FcSalesPerformance className="text-5xl" />
              </div>

              <div className="flex items-center justify-between p-5 shadow-md rounded-md">
                <div>
                  <p>Total Revenue</p>
                  <p className="text-4xl font-bold">₹ {totalRevenue || 0}</p>
                </div>
                <GiMoneyStack className="text-5xl" />
              </div>
            </div>
          </div>
        </div>

        {/* ================= COURSE TABLE ================= */}
        <div className="mx-[10%] w-[80%] flex flex-col gap-5 mb-10">
          <div className="flex justify-between">
            <h2 className="text-3xl font-semibold">Course Overview</h2>
            <button
              onClick={() => navigate("/course/create")}
              className="bg-yellow-500 px-4 py-2 rounded font-semibold"
            >
              Create New Course
            </button>
          </div>

          <table className="table">
            <tbody>
              {myCourses.map((course, idx) => (
                <tr key={course._id}>
                  <td>{idx + 1}</td>
                  <td>{course.title}</td>
                  <td>{course.category}</td>
                  <td>{course.createdBy}</td>
                  <td>{course.numberOfLectures}</td>
                  <td>{course.description}</td>
                  <td className="flex gap-4">
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
      </div>
    </HomeLayout>
  );
};

export default AdminDashboard;
