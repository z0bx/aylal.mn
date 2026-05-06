import { useContext } from "react";
import { NavigationContext } from "../context/NavigationContext";

/**
 * Hook to access navigation context
 * @returns {Object} Navigation context with currentPage and navigateTo
 */
export function useNavigation() {
  const context = useContext(NavigationContext);
  if (!context) {
    throw new Error("useNavigation must be used within NavigationProvider");
  }
  return context;
}
