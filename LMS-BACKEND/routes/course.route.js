import { Router } from "express";
import {
  createCourse,
  getAllCourse,
  getLectureByCourseId,
  removeCourse,
  updateCourse,
  addLectureToCourseById,
  deleteLectureById,
  markLectureComplete,
  addReview,
  updateLastWatchedLecture,
} from "../controllers/course.controllor.js";
import upload from "../middlewares/multer.middleware.js";
import {
  authorizedRole,
  authorizedSubscriber,
  isLoggedIn,
} from "../middlewares/auth.middleware.js";

const courseRouter = Router();

// GET all courses
courseRouter.get("/", getAllCourse);

// CREATE course
courseRouter.post(
  "/",
  isLoggedIn,
  authorizedRole("admin"),
  upload.single("thumbnail"),
  createCourse,
);

// UPDATE course
courseRouter.put("/:id", isLoggedIn, authorizedRole("admin"), updateCourse);

// DELETE course
courseRouter.delete("/:id", isLoggedIn, authorizedRole("admin"), removeCourse);

// GET lectures
courseRouter.get(
  "/:id",
  isLoggedIn,
  authorizedSubscriber,
  getLectureByCourseId,
);

// ADD lecture (route fixed)
courseRouter.post(
  "/:id/lecture",
  isLoggedIn,
  authorizedRole("admin"),
  upload.single("lecture"),
  addLectureToCourseById,
);

// DELETE lecture (ADMIN)
courseRouter.delete(
  "/:courseId/lecture/:lectureId",
  isLoggedIn,
  authorizedRole("admin"),
  deleteLectureById,
);

//! MARK lecture as complete (SUBSCRIBER)
courseRouter.post(
  "/progress",
  isLoggedIn,
  markLectureComplete
);


courseRouter.post("/review", isLoggedIn, addReview);

courseRouter.post(
  "/progress/last-watched",
  isLoggedIn,
  updateLastWatchedLecture
);


export default courseRouter;
