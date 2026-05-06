import { createContext, useState } from "react";

export const NavigationContext = createContext();

export function NavigationProvider({ children }) {
  const [currentPage, setCurrentPage] = useState("home");

  /**
   * Navigate to a specific page
   */
  const navigateTo = (pageName) => {
    setCurrentPage(pageName);
    window.scrollTo(0, 0);
  };

  return (
    <NavigationContext.Provider value={{ currentPage, navigateTo }}>
      {children}
    </NavigationContext.Provider>
  );
}
