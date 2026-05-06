import { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [loggedIn, setLoggedIn] = useState(false);
  const [user, setUser] = useState(null);

  // Restore auth state from localStorage on mount
  useEffect(() => {
    const savedAuth = localStorage.getItem("authUser");
    if (savedAuth) {
      const userData = JSON.parse(savedAuth);
      setUser(userData);
      setLoggedIn(true);
    }
  }, []);

  /**
   * Login user and persist to localStorage
   */
  const login = (userData) => {
    setUser(userData);
    setLoggedIn(true);
    localStorage.setItem("authUser", JSON.stringify(userData));
  };

  /**
   * Logout user and clear localStorage
   */
  const logout = () => {
    setUser(null);
    setLoggedIn(false);
    localStorage.removeItem("authUser");
  };

  return (
    <AuthContext.Provider value={{ loggedIn, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
