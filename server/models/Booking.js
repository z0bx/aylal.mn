import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    tourId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Tour",
      required: true,
    },
    travellers: [
      {
        firstName: String,
        lastName: String,
        email: String,
        phone: String,
      },
    ],
    paymentMethod: {
      type: String,
      enum: ["credit_card", "bank_transfer"],
      required: true,
    },
    cardDetails: {
      cardNumber: String,
      expiryDate: String,
      cvc: String,
    },
    totalPrice: {
      type: Number,
      required: true,
    },
    discount: {
      type: Number,
      default: 0,
    },
    status: {
      type: String,
      enum: ["pending", "confirmed", "completed", "cancelled"],
      default: "pending",
    },
  },
  { timestamps: true }
);

export default mongoose.model("Booking", bookingSchema);
