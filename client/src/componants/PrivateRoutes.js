import React from "react";
import { Navigate, useLocation } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem("token");
  const location = useLocation();

  // Check if the current route includes "/profile"
  const isProfileRoute = location.pathname.includes("/profile");

  return token && isProfileRoute ? children : <Navigate to="/signin" />;
};

export default PrivateRoute;
