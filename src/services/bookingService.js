import { apiClient } from "./apiClient";

export const bookingService = {
  createBooking: (bookingData) => apiClient.post("/api/bookings", bookingData),
  getUserBookings: () => apiClient.get("/api/bookings"),
};