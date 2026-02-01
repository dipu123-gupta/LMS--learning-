import cookieParser from "cookie-parser";
// import { config } from "dotenv";
// config();
import dotenv from "dotenv";
dotenv.config();          // 👈 sabse pehle

// import app from "./app.js";

import express from "express";
import cors from "cors";
import morgan from "morgan";
import errorMiddleware from "./middlewares/error.middleware.js";
import authRouter from "./routes/user.routes.js";
import courseRouter from "./routes/course.route.js";
import paymentRoutes from "./routes/payment.route.js";
import webhookRouter from "./routes/webhook.route.js";
import adminRoutes from "./routes/admin.routes.js";

const app = express();
app.use("/api/v1/webhook", webhookRouter);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(morgan("dev"));
app.use(
  cors({
    origin: function (origin, callback) {
      const allowedOrigins = [
        "http://localhost:5173",
        "https://lms-learning.onrender.com"
      ];

      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);


app.use("/api/v1/admin", adminRoutes);
app.use("/api/v1/user", authRouter);
app.use("/api/v1/courses", courseRouter);
app.use("/api/v1/payment", paymentRoutes);

// app.use()

app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "LMS Backend is running 🚀",
  });
});

app.get("/u", (req, res) => {
  res.status(200).json({
    success: true,
    message: "LMS Backend is landing 🚀",
  });
});


app.use((req, res) => {
  res.status(404).json({ success: false, message: "Route not found" });
});

app.use(errorMiddleware);

export default app;
