import express from "express";
import {
  getReviewsByTour,
  createReview,
  deleteReview,
} from "../controllers/reviewController.js";
import { protect } from "../middleware/auth.js";

const router = express.Router();

router.get("/tour/:tourId", getReviewsByTour);
router.post("/tour/:tourId", protect, createReview);
router.delete("/:id", protect, deleteReview);

export default router;
