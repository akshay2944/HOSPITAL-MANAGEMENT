import bcrypt from "bcrypt"

import jwt from "jsonwebtoken";
import User from "../models/user.models.js";

export const isAuthenticated = async (
  req,
  res,
  next
) => {
  try {
    console.log(req.body)
    const token =
      req.cookies?.accessToken ||
      req.header("Authorization")?.replace(
        "Bearer ",
        ""
      );

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }

    const decoded = jwt.verify(
      token,
      process.env.ACCESS_TOKEN_SECRET
    );

    const user = await User.findById(
      decoded.id
    ).select("-password -refreshToken");

    if (!user) {


      return res.status(401).json({
        success: false,
        message: "User not found",
      });
    }

    req.user = user;

    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Invalid Token",
    });
  }
};