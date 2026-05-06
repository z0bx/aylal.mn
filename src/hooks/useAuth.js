import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

/**
 * Hook to access authentication context
 * @returns {Object} Auth context with loggedIn, user, login, logout
 */
export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
}
