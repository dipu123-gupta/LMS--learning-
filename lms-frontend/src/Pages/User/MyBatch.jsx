import HomeLayout from "../../Layouts/HomeLayout.jsx";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import CourseCard from "../../Components/CourseCard.jsx";
import { getAllCourses } from "../../Redux/Slices/CourseSlice.js";

const MyBatch = () => {
  const dispatch = useDispatch();

  // 🔐 Logged-in user
  const { data: user } = useSelector((state) => state.auth);

  // 📚 All courses from store
  const allCourses = useSelector(
    (state) => state.Courses?.courseData || []
  );

  // 🔄 Load all courses when page opens
  useEffect(() => {
    dispatch(getAllCourses());
  }, [dispatch]);

  // 🧠 Subscribed course IDs
  const subscribedIds = user?.subscribedCourses || [];

  // 🎓 Only subscribed courses
  const myBatches = allCourses.filter((course) =>
    subscribedIds.includes(course._id)
  );

  return (
    <HomeLayout>
      <div className="min-h-[90vh] px-4 sm:px-6 lg:px-10 pt-10 text-white">
        <h1 className="text-3xl sm:text-4xl font-bold text-yellow-400 text-center mb-10">
          🎓 My Batch
        </h1>

        {myBatches.length === 0 ? (
          <p className="text-center text-gray-400">
            You have not enrolled in any course yet.
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {myBatches.map((course) => (
              <CourseCard key={course._id} data={course} />
            ))}
          </div>
        )}
      </div>
    </HomeLayout>
  );
};

export default MyBatch;
