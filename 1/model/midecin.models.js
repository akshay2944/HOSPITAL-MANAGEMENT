import mongoose from "mongoose";
import clinic from "./clinic.models";

const medicineSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    manufacturer: {
      type: mongoose.Schema.Types.ObjectId,
      ref:clinic,
      required: true,
    },

    category: {
      type: String,
      enum: ["Tablet", "Capsule", "Syrup", "Injection", "Cream"],
      required: true,
    },

    price: {
      type: Number,
      required: true,
      min: 0,
    },

    stock: {
      type: Number,
      required: true,
      default: 0,
    },

    expiryDate: {
      type: Date,
      required: true,
    },

    description: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const Medicine = mongoose.model("Medicine", medicineSchema);

export default Medicine;