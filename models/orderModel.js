import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    products: [
      {
        type: mongoose.ObjectId,
        ref: "Product", // ✅ FIXED
      },
    ],
    payment: {},
    buyer: {
      type: mongoose.ObjectId,
      ref: "users",
    },
    status: {
      type: String,
      default: "Not Process",
      enum: ["Not Process", "Processing", "Shipped", "Delivered", "Cancel"], // optional clean
    },
  },
  { timestamps: true },
);

export default mongoose.models.Order || mongoose.model("Order", orderSchema);
