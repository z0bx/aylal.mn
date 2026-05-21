import { apiClient } from "./apiClient";

export const tourService = {
  getAllTours: () => apiClient.get("/api/tours"),
  getTourById: (id) => apiClient.get(`/api/tours/${id}`),
};