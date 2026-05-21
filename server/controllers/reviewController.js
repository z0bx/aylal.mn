import Review from "../models/Review.js";
import Tour from "../models/Tour.js";

export const getReviewsByTour = async (req, res) => {
  try {
    const reviews = await Review.find({ tourId: req.params.tourId })
      .populate("userId", "name")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: reviews.length,
      reviews,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const createReview = async (req, res) => {
  try {
    const { rating, comment } = req.body;

    if (!rating || !comment) {
      return res.status(400).json({
        success: false,
        message: "Please provide rating and comment",
      });
    }

    const tour = await Tour.findById(req.params.tourId);
    if (!tour) {
      return res.status(404).json({
        success: false,
        message: "Tour not found",
      });
    }

    const review = await Review.create({
      userId: req.user.id,
      tourId: req.params.tourId,
      rating,
      comment,
    });

    const allReviews = await Review.find({ tourId: req.params.tourId });
    const avgRating =
      allReviews.reduce((sum, r) => sum + r.rating, 0) / allReviews.length;

    await Tour.findByIdAndUpdate(
      req.params.tourId,
      { rating: avgRating, reviewCount: allReviews.length },
      { new: true }
    );

    res.status(201).json({
      success: true,
      review,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const deleteReview = async (req, res) => {
  try {
    const review = await Review.findById(req.params.id);

    if (!review) {
      return res.status(404).json({
        success: false,
        message: "Review not found",
      });
    }

    if (review.userId.toString() !== req.user.id && req.user.role !== "admin") {
      return res.status(403).json({
        success: false,
        message: "Not authorized to delete this review",
      });
    }

    await Review.findByIdAndDelete(req.params.id);

    const allReviews = await Review.find({ tourId: review.tourId });
    if (allReviews.length > 0) {
      const avgRating =
        allReviews.reduce((sum, r) => sum + r.rating, 0) / allReviews.length;
      await Tour.findByIdAndUpdate(
        review.tourId,
        { rating: avgRating, reviewCount: allReviews.length },
        { new: true }
      );
    } else {
      await Tour.findByIdAndUpdate(
        review.tourId,
        { rating: 0, reviewCount: 0 },
        { new: true }
      );
    }

    res.status(200).json({
      success: true,
      message: "Review deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
