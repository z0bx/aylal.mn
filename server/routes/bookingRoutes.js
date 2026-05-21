import express from "express";
import {
  createBooking,
  getUserBookings,
  getBookingById,
  updateBookingStatus,
  getAllBookings,
} from "../controllers/bookingController.js";
import { protect, authorize } from "../middleware/auth.js";

const router = express.Router();

router.post("/", protect, createBooking);
router.get("/", protect, getUserBookings);
router.get("/all", protect, authorize("admin"), getAllBookings);
router.get("/:id", protect, getBookingById);
router.put("/:id", protect, authorize("admin"), updateBookingStatus);

export default router;
