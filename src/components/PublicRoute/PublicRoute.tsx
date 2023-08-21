import React, { ReactElement } from "react";
import { Navigate } from "react-router-dom";

interface PublicRouteProps {
  element: ReactElement;
  isLoggedIn: boolean;
}

const PublicRoute: React.FC<PublicRouteProps> = ({ element, isLoggedIn }) => {
  return !isLoggedIn ? element : <Navigate to="/dashboard" />;
};

export default PublicRoute;
