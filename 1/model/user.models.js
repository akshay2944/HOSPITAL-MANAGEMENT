import mongoose from "mongoose";

const patientSchema = new mongoose.Schema(
  {
    patientId: {
      type: String,
      unique: true,
      required: true,
    },

    fullName: {
      type: String,
      required: true,
    },

    age: {
      type: Number,
      required: true,
    },

    gender: {
      type: String,
      enum: ["Male", "Female", "Other"],
      required: true,
    },

    phone: {
      type: String,
      required: true,
    },

    email: {
      type: String,
    },

    address: {
      type: String,
      required: true,
    },

    bloodGroup: {
      type: String,
    },

    emergencyContact: {
      type: String,
    },

    diseaseHistory: {
      type: String,
    }
  },
  { timestamps: true }
);

export default mongoose.model("Patient", patientSchema);