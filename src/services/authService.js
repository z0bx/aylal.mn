import { apiClient } from "./apiClient";

export const authService = {
  login: (email, password) => apiClient.post("/api/auth/login", { email, password }),
  register: (userData) => apiClient.post("/api/auth/register", userData),
  logout: async () => {
    await apiClient.post("/api/auth/logout");
    localStorage.removeItem("authToken");
    return { success: true };
  }
};