import dotenv from "dotenv";
dotenv.config();

import app from "./app.js";
import connectionToDB from "./config/dbConnection.js";
import { v2 } from "cloudinary";
import Razorpay from 'razorpay'

const PORT = process.env.PORT;

v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// RazorPay instance
export const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_SECRET,
});

// app.get("/", (req, res) => {
//   res.status(200).json({
//     success: true,
//     message: "LMS Backend is running 🚀",
//   });
// });

connectionToDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`App running a http:/localhost${PORT}`);
    });
  })
  .catch((error) => console.log(error));