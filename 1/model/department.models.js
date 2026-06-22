import mongoose from "mongoose";

const departmentSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      unique: true,
      required: true,
    },

    description: String,
  },
  { timestamps: true }
);

export default mongoose.model(
  "Department",
  departmentSchema
);