import mongoose from "mongoose";
import User from "./user.models.js";

const otpSchema = new mongoose.Schema(
  {
    email: {
      type:mongoose.Schema.Types.ObjectId,
      ref:'User',
      required: true,
      lowercase: true,
      trim: true,
    },
    otp: {
      type: String,
      required: true,
    },
    expiresAt: {
      type: Date,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("OTP", otpSchema);