import mongoose from "mongoose";

const clinicSchema = new mongoose.Schema(
  {
    hospital: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Hospital",
      required: true,
    },

    clinicName: {
      type: String,
      required: true,
    },

    clinicCode: {
      type: String,
      unique: true,
    },

    department: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Department",
    },

    location: String,

    phone: String,

    headDoctor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Doctor",
    },

    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model(
  "Clinic",
  clinicSchema
);