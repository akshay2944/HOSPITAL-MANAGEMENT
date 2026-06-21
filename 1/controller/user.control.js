
import user  from "../model/user.models.js";
import mongoose, { deleteModel } from "mongoose";
import User from "../model/user.models.js";
import otpHandler from "./otp.controller.js";

const registerUser = async (req, res) => {
  try {
    const { fullname, username, email, phone, password } = req.body;

    if (!fullname || !username || !email || !phone || !password) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    const existingUser = await User.findOne({
      $or: [{ email }, { username }],
    });

    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: "User already exists",
      });
    }

    // Generate and send OTP
    await otpHandler(email);

    return res.status(200).json({
      success: true,
      message: "OTP sent successfully",
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user
    const user = await User.findOne({ email }).select("+password");

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // Verify password
    const isPasswordCorrect = await user.isPasswordCorrect(password);

    if (!isPasswordCorrect) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    // Generate tokens
    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();

    // Save refresh token
    user.refreshtoken = refreshToken;
    await user.save({ validateBeforeSave: false });

    // Get safe user data
    const loggedInUser = await User.findById(user._id)
      .select("-password -refreshtoken -__v");

    return res
  .status(200)
  .cookie("accessToken", accessToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
  })
  .cookie("refreshToken", refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
  })
  .json({
    success: true,
    message: "Login successful",
    user: loggedInUser,
  });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

 export { registerUser, loginUser };