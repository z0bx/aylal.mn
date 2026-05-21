import Tour from "../models/Tour.js";

export const getAllTours = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const tours = await Tour.find()
      .skip(skip)
      .limit(limit)
      .populate("createdBy", "name email");

    const total = await Tour.countDocuments();

    res.status(200).json({
      success: true,
      count: tours.length,
      total,
      page,
      pages: Math.ceil(total / limit),
      tours,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getTourById = async (req, res) => {
  try {
    const tour = await Tour.findById(req.params.id).populate("createdBy", "name email");

    if (!tour) {
      return res.status(404).json({
        success: false,
        message: "Tour not found",
      });
    }

    res.status(200).json({
      success: true,
      tour,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const createTour = async (req, res) => {
  try {
    const { title, description, price, duration, location, maxCapacity, daysItinerary, image } = req.body;

    if (!title || !description || !price || !duration || !location) {
      return res.status(400).json({
        success: false,
        message: "Please provide all required fields",
      });
    }

    const tour = await Tour.create({
      title,
      description,
      price,
      duration,
      location,
      maxCapacity: maxCapacity || 20,
      daysItinerary: daysItinerary || [],
      image: image || null,
      createdBy: req.user.id,
    });

    res.status(201).json({
      success: true,
      tour,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const updateTour = async (req, res) => {
  try {
    let tour = await Tour.findById(req.params.id);

    if (!tour) {
      return res.status(404).json({
        success: false,
        message: "Tour not found",
      });
    }

    tour = await Tour.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({
      success: true,
      tour,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const deleteTour = async (req, res) => {
  try {
    const tour = await Tour.findById(req.params.id);

    if (!tour) {
      return res.status(404).json({
        success: false,
        message: "Tour not found",
      });
    }

    await Tour.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: "Tour deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
