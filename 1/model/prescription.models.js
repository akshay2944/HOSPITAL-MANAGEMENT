import mongoose from "mongoose";

const prescriptionSchema = new mongoose.Schema(
  {
    patient: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Patient",
    },

    doctor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Doctor",
    },

    appointment: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Appointment",
    },

    diagnosis: String,

    medicines: [
      {
        medicineName: String,
        dosage: String,
        duration: String,
      },
    ],

    instructions: String,
  },
  { timestamps: true }
);

export default mongoose.model(
  "Prescription",
  prescriptionSchema
);