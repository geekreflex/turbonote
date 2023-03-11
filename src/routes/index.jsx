import { Navigate } from 'react-router-dom';

export const PublicRoute = ({ isLoggedIn, children }) => {
  return isLoggedIn ? <Navigate to="/note" replace /> : <>{children}</>;
};

export const ProtectedRoute = ({ isLoggedIn, children }) => {
  return isLoggedIn ? <>{children}</> : <Navigate to="/enter" replace />;
};
