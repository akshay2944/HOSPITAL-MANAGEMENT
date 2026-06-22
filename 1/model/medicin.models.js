import mongoose from "mongoose";
import Patient from "./patient.models.js";

const medicalRecordSchema = new mongoose.Schema(
  {
    patient: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Patient",
      required: true,
    },

    bloodGroup: String,

    allergies: [String],

    chronicDiseases: [String],

    familyHistory: String,

    notes: String,
  },
  { timestamps: true }
);

export default mongoose.model(
  "MedicalRecord",
  medicalRecordSchema
);