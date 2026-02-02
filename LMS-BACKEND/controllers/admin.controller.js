import User from "../models/user.models.js";
import Course from "../models/course.model.js";


export const getAdminStats = async (req, res) => {
  const allUserCount = await User.countDocuments();

  const subscribeCount = await User.countDocuments({
    subscribedCourses: { $exists: true, $ne: [] },
  });

  res.status(200).json({
    success: true,
    allUserCount,
    subscribeCount,
  });
};


export const getInstructorStats = async (req, res) => {
const courses = await Course.find({ createdBy: req.user.name.trim() });

  const totalCourses = courses.length;
  const avgRating =
    courses.reduce((a, c) => a + (c.averageRating || 0), 0) /
    (courses.length || 1);

  res.json({
    totalCourses,
    avgRating: avgRating.toFixed(1),
  });
};
