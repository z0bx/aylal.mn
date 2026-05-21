import mongoose from "mongoose";

const tourSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Please provide a tour title"],
    },
    description: {
      type: String,
      required: [true, "Please provide a description"],
    },
    image: {
      type: String,
      default: null,
    },
    price: {
      type: Number,
      required: [true, "Please provide a price"],
    },
    duration: {
      type: Number,
      required: [true, "Please provide duration in days"],
    },
    location: {
      type: String,
      required: [true, "Please provide a location"],
    },
    maxCapacity: {
      type: Number,
      required: [true, "Please provide max capacity"],
      default: 20,
    },
    daysItinerary: [
      {
        day: Number,
        title: String,
        description: String,
        activities: [String],
      },
    ],
    rating: {
      type: Number,
      default: 0,
      min: 0,
      max: 5,
    },
    reviewCount: {
      type: Number,
      default: 0,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Tour", tourSchema);
