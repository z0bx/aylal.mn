import { createContext, useState } from "react";

export const NavigationContext = createContext();

export function NavigationProvider({ children }) {
  const [currentPage, setCurrentPage] = useState("home");
  // Route estimate state shared between Map and Booking pages
  const [routeEstimate, setRouteEstimate] = useState({ distanceKm: 0, cost: 0 });
  // Optional page params passed when navigating (e.g., { tourId, routePath })
  const [pageParams, setPageParams] = useState(null);

  /**
   * Navigate to a specific page
   */
  const navigateTo = (pageName, params = null) => {
    setCurrentPage(pageName);
    setPageParams(params);
    window.scrollTo(0, 0);
  };

  const setRouteEstimateSafe = (estimate) => {
    setRouteEstimate(prev => ({ ...prev, ...estimate }));
  };

  return (
    <NavigationContext.Provider value={{ currentPage, navigateTo, routeEstimate, setRouteEstimate: setRouteEstimateSafe, pageParams, setPageParams }}>
      {children}
    </NavigationContext.Provider>
  );
}
