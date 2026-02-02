import Course from "../models/course.model.js";
import User from "../models/user.models.js"; // ✅ FIX: missing import
import AppError from "../utils/error.util.js";
import { v2 as cloudinary } from "cloudinary";
import fs from "fs/promises";

/* =======================
   GET ALL COURSES
======================= */
const getAllCourse = async (req, res, next) => {
  try {
    const courses = await Course.find({}).select("-lectures");

    res.status(200).json({
      success: true,
      message: "All courses fetched successfully",
      courses,
    });
  } catch (error) {
    return next(new AppError(error.message, 500));
  }
};

/* =======================
   GET LECTURES BY COURSE ID
======================= */
const getLectureByCourseId = async (req, res, next) => {
  try {
    const { id } = req.params;

    const course = await Course.findById(id);

    if (!course) {
      return next(new AppError("Invalid course id", 400));
    }

    res.status(200).json({
      success: true,
      message: "Lectures fetched successfully",
      lectures: course.lectures,
    });
  } catch (error) {
    return next(new AppError(error.message, 500));
  }
};

/* =======================
   CREATE COURSE
======================= */
const createCourse = async (req, res, next) => {
  try {
    const { title, description, category, createdBy, price, discount } =
      req.body;

    if (
      !title ||
      !description ||
      !category ||
      !createdBy ||
      price === undefined
    ) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    const course = await Course.create({
      title,
      description,
      category,
      createdBy,
      price,
      discount,
      thumbnail: {
        public_id: "dummy",
        secure_url: "dummy",
      },
    });

    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: "lms",
      });

      course.thumbnail = {
        public_id: result.public_id,
        secure_url: result.secure_url,
      };

      await fs.unlink(req.file.path);
    }

    await course.save();

    return res.status(201).json({
      success: true,
      message: "Course created successfully",
      course,
    });
  } catch (error) {
    return next(new AppError(error.message, 500));
  }
};

/* =======================
   UPDATE COURSE
======================= */
const updateCourse = async (req, res, next) => {
  try {
    const { id } = req.params;

    const course = await Course.findById(id);
    if (!course) {
      return next(new AppError("Course with given id does not exist", 404));
    }

    const { title, description, category } = req.body;

    if (title) course.title = title;
    if (description) course.description = description;
    if (category) course.category = category;

    if (req.file) {
      if (course.thumbnail.public_id) {
        await cloudinary.uploader.destroy(course.thumbnail.public_id);
      }

      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: "lms",
      });

      course.thumbnail = {
        public_id: result.public_id,
        secure_url: result.secure_url,
      };

      await fs.unlink(req.file.path);
    }

    await course.save();

    res.status(200).json({
      success: true,
      message: "Course updated successfully",
      course,
    });
  } catch (error) {
    return next(new AppError(error.message, 500));
  }
};

/* =======================
   DELETE COURSE
======================= */
const removeCourse = async (req, res, next) => {
  try {
    const { id } = req.params;

    const course = await Course.findById(id);
    if (!course) {
      return next(new AppError("Course not found", 404));
    }

    if (course.thumbnail.public_id) {
      await cloudinary.uploader.destroy(course.thumbnail.public_id);
    }

    await Course.findByIdAndDelete(id);

    res.status(200).json({
      success: true,
      message: "Course deleted successfully",
    });
  } catch (error) {
    return next(new AppError(error.message, 500));
  }
};

/* =======================
   ADD LECTURE
======================= */
const addLectureToCourseById = async (req, res, next) => {
  try {
    const { title, description } = req.body;
    const { id } = req.params;

    if (!title || !description) {
      return next(new AppError("All fields are required", 400));
    }

    const course = await Course.findById(id);
    if (!course) {
      return next(new AppError("Course does not exist", 404));
    }

    const lectureData = { title, description, lecture: {} };

    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: "lms/lectures",
        resource_type: "video",
      });

      lectureData.lecture = {
        public_id: result.public_id,
        secure_url: result.secure_url,
      };

      await fs.unlink(req.file.path);
    }

    course.lectures.push(lectureData);
    course.numberOfLectures = course.lectures.length;

    await course.save();

    res.status(200).json({
      success: true,
      message: "Lecture successfully added",
      course,
    });
  } catch (error) {
    next(error);
  }
};

/* =======================
   DELETE LECTURE
======================= */
const deleteLectureById = async (req, res, next) => {
  try {
    const { courseId, lectureId } = req.params;

    const course = await Course.findById(courseId);
    if (!course) {
      return next(new AppError("Course not found", 404));
    }

    const lecture = course.lectures.find(
      (lec) => lec._id.toString() === lectureId,
    );
    if (!lecture) {
      return next(new AppError("Lecture not found", 404));
    }

    if (lecture.lecture?.public_id) {
      await cloudinary.uploader.destroy(lecture.lecture.public_id, {
        resource_type: "video",
      });
    }

    course.lectures = course.lectures.filter(
      (lec) => lec._id.toString() !== lectureId,
    );
    course.numberOfLectures = course.lectures.length;

    await course.save();

    res.status(200).json({
      success: true,
      message: "Lecture deleted successfully",
    });
  } catch (error) {
    next(new AppError(error.message, 500));
  }
};

/* =======================
   MARK LECTURE COMPLETE
======================= */
const markLectureComplete = async (req, res, next) => {
  try {
    const { courseId, lectureId } = req.body;

    if (!courseId || !lectureId) {
      return res.status(400).json({
        success: false,
        message: "courseId and lectureId required",
      });
    }

    const user = await User.findById(req.user._id);

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }

    if (!Array.isArray(user.progress)) {
      user.progress = [];
    }

    let progress = user.progress.find(
      (p) => String(p.courseId) === String(courseId)
    );

    // 🔥 CREATE PROGRESS ENTRY IF NOT EXISTS
    if (!progress) {
      user.progress.push({
        courseId,
        completedLectures: [lectureId],
        lastWatchedLecture: lectureId,
      });

      await user.save();

      return res.status(200).json({
        success: true,
        message: "Progress created and lecture marked complete",
      });
    }

    // 🔁 prevent duplicate lecture
    if (!progress.completedLectures.some(
      (id) => String(id) === String(lectureId)
    )) {
      progress.completedLectures.push(lectureId);
    }

    progress.lastWatchedLecture = lectureId;

    await user.save();

    res.status(200).json({
      success: true,
      message: "Lecture marked complete",
    });
  } catch (error) {
    next(error);
  }
};


/* =======================
   UPDATE LAST WATCHED LECTURE
======================= */
const updateLastWatchedLecture = async (req, res, next) => {
  try {
    const { courseId, lectureId } = req.body;

    if (!courseId || !lectureId) {
      return res.status(400).json({
        success: false,
        message: "courseId and lectureId are required",
      });
    }

    // ✅ correct user reference
    const user = await User.findById(req.user._id);

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }

    if (!Array.isArray(user.progress)) {
      user.progress = [];
    }

    // ✅ SAFE comparison
    let progress = user.progress.find(
      (p) => String(p.courseId) === String(courseId)
    );

    // 🔥 create progress entry if not exists
    if (!progress) {
      user.progress.push({
        courseId,
        completedLectures: [],
        lastWatchedLecture: lectureId,
      });

      await user.save();

      return res.status(200).json({
        success: true,
        message: "Progress entry created",
      });
    }

    // 🔁 prevent unnecessary update
    if (String(progress.lastWatchedLecture) === String(lectureId)) {
      return res.status(200).json({
        success: true,
        message: "Already updated",
      });
    }

    // ✅ update last watched
    progress.lastWatchedLecture = lectureId;

    await user.save();

    res.status(200).json({
      success: true,
      message: "Last watched lecture updated",
    });
  } catch (error) {
    next(error);
  }
};


/* =======================
   ADD REVIEW
======================= */
const addReview = async (req, res, next) => {
  try {
    const { courseId, rating, comment } = req.body;
    const userId = req.user._id;

    if (!rating || !comment) {
      return next(new AppError("Rating and comment are required", 400));
    }

    if (rating < 1 || rating > 5) {
      return next(new AppError("Rating must be between 1 and 5", 400));
    }

    const course = await Course.findById(courseId);
    if (!course) {
      return next(new AppError("Course not found", 404));
    }

    const alreadyReviewed = course.reviews.find(
      (r) => r.user.toString() === userId.toString(),
    );

    if (alreadyReviewed) {
      return next(new AppError("You already reviewed this course", 400));
    }

    course.reviews.push({
      user: userId,
      rating,
      comment,
    });

    const totalRating =
      course.reviews.reduce((sum, r) => sum + r.rating, 0) /
      course.reviews.length;

    course.averageRating = Number(totalRating.toFixed(1));

    await course.save();

    res.status(200).json({
      success: true,
      message: "Review added successfully",
    });
  } catch (error) {
    next(error);
  }
};

export {
  getAllCourse,
  getLectureByCourseId,
  createCourse,
  updateCourse,
  removeCourse,
  addLectureToCourseById,
  deleteLectureById,
  markLectureComplete,
  updateLastWatchedLecture,
  addReview,
};
