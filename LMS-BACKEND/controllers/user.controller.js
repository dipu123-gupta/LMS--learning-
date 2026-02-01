import sendEmail from "../config/sendEmail.js";
import User from "../models/user.models.js";
import AppError from "../utils/error.util.js";
import { v2 as cloudinary } from "cloudinary";
import fs from "fs/promises";
import crypto from "crypto";

/* ================= COOKIE OPTIONS ================= */
const cookieOptions = {
  httpOnly: true,
  secure: true,          // HTTPS (Render / Vercel)
  sameSite: "none",      // cross-domain
  maxAge: 7 * 24 * 60 * 60 * 1000,
};

/* ================= REGISTER ================= */
const register = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return next(new AppError("All fields are required", 400));
    }

    const exists = await User.findOne({ email });
    if (exists) {
      return next(new AppError("Email already exists", 400));
    }

    const user = await User.create({
      name,
      email,
      password,
      avatar: {
        public_id: email,
        secure_url:
          "https://res.cloudinary.com/demo/image/upload/getting-started/shoes.jpg",
      },
    });

    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: "lms",
        width: 250,
        height: 250,
        crop: "fill",
      });
      user.avatar = {
        public_id: result.public_id,
        secure_url: result.secure_url,
      };
      await fs.unlink(req.file.path);
    }

    const token = user.generateToken();
    await user.save();
    user.password = undefined;

    res.cookie("token", token, cookieOptions);
    res.status(201).json({
      success: true,
      message: "User registered successfully",
      user,
    });
  } catch (error) {
    next(error);
  }
};

/* ================= LOGIN ================= */
const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return next(new AppError("All fields are required", 400));
    }

    const user = await User.findOne({ email }).select("+password");
    if (!user || !(await user.comparePassword(password))) {
      return next(new AppError("Invalid email or password", 400));
    }

    const token = user.generateToken();
    user.activeToken = token;
    await user.save();

    res.cookie("token", token, cookieOptions);
    res.status(200).json({
      success: true,
      message: "Login successful",
      user,
    });
  } catch (error) {
    next(error);
  }
};

/* ================= PROFILE ================= */
const profile = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id);
    res.status(200).json({
      success: true,
      message: "User details",
      user,
    });
  } catch (error) {
    next(error);
  }
};

/* ================= LOGOUT ================= */
const logout = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id);
    if (user) {
      user.activeToken = null;
      await user.save();
    }

    res.cookie("token", "", {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      expires: new Date(0),
    });

    res.status(200).json({
      success: true,
      message: "Logged out successfully",
    });
  } catch (error) {
    next(error);
  }
};

/* ================= FORGOT PASSWORD ================= */
const forgetPassword = async (req, res, next) => {
  try {
    const { email } = req.body;
    if (!email) return next(new AppError("Email is required", 400));

    const user = await User.findOne({ email });
    if (!user) return next(new AppError("Email not registered", 400));

    const resetToken = user.generatePasswordResetToken();
    await user.save();

    const frontendURL = process.env.FRONTEND_URL.replace(/\/$/, "");
    const resetPasswordURL = `${frontendURL}/reset-password/${resetToken}`;

    const message = `
      <h2>Password Reset</h2>
      <p>Click below to reset password</p>
      <a href="${resetPasswordURL}">Reset Password</a>
    `;

    await sendEmail(email, "Reset Password", message);

    res.status(200).json({
      success: true,
      message: "Reset password link sent to email",
    });
  } catch (error) {
    next(error);
  }
};

/* ================= RESET PASSWORD ================= */
const resetPassword = async (req, res, next) => {
  try {
    const { resetToken } = req.params;
    const { password } = req.body;

    if (!password) {
      return next(new AppError("Password is required", 400));
    }

    const hashedToken = crypto
      .createHash("sha256")
      .update(resetToken)
      .digest("hex");

    const user = await User.findOne({
      forgetPasswordToken: hashedToken,
      forgetPasswordExpiry: { $gt: Date.now() },
    });

    if (!user) {
      return next(new AppError("Token invalid or expired", 400));
    }

    user.password = password;
    user.forgetPasswordToken = undefined;
    user.forgetPasswordExpiry = undefined;
    await user.save();

    res.status(200).json({
      success: true,
      message: "Password reset successful",
    });
  } catch (error) {
    next(error);
  }
};

/* ================= CHANGE PASSWORD ================= */
const changePassword = async (req, res, next) => {
  try {
    const { oldPassword, newPassword } = req.body;
    const user = await User.findById(req.user.id).select("+password");

    if (!user) return next(new AppError("User not found", 404));

    const match = await user.comparePassword(oldPassword);
    if (!match) {
      return next(new AppError("Old password incorrect", 401));
    }

    user.password = newPassword;
    await user.save();

    // ✅ token NOT removed
    res.status(200).json({
      success: true,
      message: "Password changed successfully",
    });
  } catch (error) {
    next(error);
  }
};

/* ================= UPDATE PROFILE ================= */
const updateProfile = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) return next(new AppError("User not found", 404));

    if (req.body.name) user.name = req.body.name;

    if (req.file) {
      await cloudinary.uploader.destroy(user.avatar.public_id);
      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: "lms",
        width: 250,
        height: 250,
        crop: "fill",
      });
      user.avatar = {
        public_id: result.public_id,
        secure_url: result.secure_url,
      };
      await fs.unlink(req.file.path);
    }

    await user.save();
    res.status(200).json({
      success: true,
      message: "Profile updated successfully",
    });
  } catch (error) {
    next(error);
  }
};

export {
  register,
  login,
  profile,
  logout,
  forgetPassword,
  resetPassword,
  changePassword,
  updateProfile,
};

