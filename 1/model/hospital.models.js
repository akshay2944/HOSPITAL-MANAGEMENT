import mongoose from "mongoose";

const hospitalSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    registrationNumber: {
      type: String,
      unique: true,
      required: true,
    },

    email: String,

    phone: String,

    address: String,

    pincode: String,

    logo: {
      public_id: String,
      url: String,
    },

    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model(
  "Hospital",
  hospitalSchema
);