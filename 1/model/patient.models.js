import mongoose from "mongoose";
import userModels from "./user.models.js";

const patientSchema = new mongoose.Schema({

  patientId: {
    type: mongoose.Schema.Types.ObjectId,
    ref:userModels,
    unique: true,
  },

  fullname:{
    type:String,
    required : true
  },

  age: Number,

  gender: String,

  phone: String,

  address: String,

  medicalRecord: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "MedicalRecord",
  },
});