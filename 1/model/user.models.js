import mongoose from "mongoose";

const patientSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
    },
    passward:{
      type:String,
      required:true
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
    role:{
      type:String,
      enum:[patient,doctor,nurse]
    },
    refreshtoken:{
      type:String,
    }
  },
  { timestamps: true }
);


patientSchema.method

export default mongoose.model("Patient", patientSchema);


