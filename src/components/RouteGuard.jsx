import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

// MY MIDDLEWARE:
// - Not logged in + on /dashboard -> redirect to /login
// - Logged in + on /login or /register -> redirect to /dashboard
export function RouteGuard({ children }) {
  const { isLoggedIn } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoggedIn && location.pathname === "/dashboard") {
      navigate("/login", { replace: true });
      return;
    }

    if (
      isLoggedIn &&
      (location.pathname === "/login" || location.pathname === "/register")
    ) {
      navigate("/dashboard", { replace: true });
    }
  }, [isLoggedIn, location.pathname, navigate]);

  return children;
}
