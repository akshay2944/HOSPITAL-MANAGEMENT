import mongoose from "mongoose";
import User from "./user.models.js";

const medicineSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    manufacturer: {
      type: mongoose.Schema.Types.ObjectId,
      ref:User,
      required: true,
    },

    category: {
      type: String,
      required: true,
    },

    price: {
      type: Number,
      required: true,
    },

    stock: {
      type: Number,
      default: 0,
    },

    expiryDate: {
      type: Date,
      required: true,
    },

    description: String,
  },
  {
    timestamps: true,
  }
);

const Medicine = mongoose.model("Medicine", medicineSchema);

export default Medicine;