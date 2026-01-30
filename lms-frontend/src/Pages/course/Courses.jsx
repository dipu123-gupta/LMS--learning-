import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllCourses } from "../../Redux/Slices/CourseSlice.js";
import HomeLayout from "../../Layouts/HomeLayout.jsx";
import CourseCard from "../../Components/CourseCard.jsx";

const Courses = () => {
  const dispatch = useDispatch();

  // SAFE SELECTOR
  const courseData = useSelector(
    (state) => state.Courses?.courseData || []
  );

  useEffect(() => {
    dispatch(getAllCourses());
  }, [dispatch]);

  return (
    <HomeLayout>
      <div className="min-h-[90vh] pt-12 pl-20 flex flex-col gap-10 text-white">
        <h1 className="text-3xl md:text-4xl font-extrabold text-white text-center">
          Explore courses made by{" "}
          <span className="text-yellow-400">Industry Experts</span>
        </h1>

        <div className="mb-10 flex flex-wrap gap-14">
          {courseData.length > 0 ? (
            courseData.map((course) => (
              <CourseCard key={course._id} data={course} />
            ))
          ) : (
            <p>No courses available</p>
          )}
        </div>
      </div>
    </HomeLayout>
  );
};

export default Courses;
