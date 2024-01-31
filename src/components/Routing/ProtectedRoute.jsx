import React from "react";
import { getUser } from "../../services/userServices";
import { Navigate, Outlet, useLocation } from "react-router-dom";

const ProtectedRoute = () => {
  const { pathname } = useLocation();

  return getUser() ? (
    <Outlet />
  ) : (
    <Navigate to="/login" state={{ from: pathname }} />
  );
};

export default ProtectedRoute;
