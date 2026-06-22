import mongoose from "mongoose";

const cartSchema = new mongoose.Schema(
  {
    patient: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Patient",
      required: true,
    },

    items: [
      {
        medicine: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Medicine",
        },

        quantity: {
          type: Number,
          default: 1,
        },

        price: {
          type: Number,
          required: true,
        },
      },
    ],

    totalAmount: {
      type: Number,
      default: 0,
    },

    status: {
      type: String,
      enum: [
        "active",
        "ordered",
        "cancelled"
      ],
      default: "active",
    },
  },
  { timestamps: true }
);

export default mongoose.model(
  "Cart",
  cartSchema
);