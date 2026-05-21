import express from "express";
import {
  getAllTours,
  getTourById,
  createTour,
  updateTour,
  deleteTour,
} from "../controllers/tourController.js";
import { protect, authorize } from "../middleware/auth.js";

const router = express.Router();

router.get("/", getAllTours);
router.get("/:id", getTourById);
router.post("/", protect, authorize("admin"), createTour);
router.put("/:id", protect, authorize("admin"), updateTour);
router.delete("/:id", protect, authorize("admin"), deleteTour);

export default router;
