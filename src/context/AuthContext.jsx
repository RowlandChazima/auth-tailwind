import { createContext, useState, useCallback } from "react";

export const AuthContext = createContext(null);

const STORAGE_KEY = "auth_logged_in";

export function AuthProvider({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(() =>
    Boolean(localStorage.getItem(STORAGE_KEY)),
  );

  //  localStorage.setItem("auth_logged_in", true)
  const login = useCallback(() => {
    localStorage.setItem(STORAGE_KEY, true);
    setIsLoggedIn(true);
  }, []);

  //  localStorage.removeItem("auth_logged_in")
  const logout = useCallback(() => {
    localStorage.removeItem(STORAGE_KEY);
    setIsLoggedIn(false);
  }, []);

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
