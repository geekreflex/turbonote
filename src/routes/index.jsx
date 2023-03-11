import { Navigate } from 'react-router-dom';
import { auth } from '../config/firebase';

export const PublicRoute = ({ children }) => {
  return auth.currentUser ? <Navigate to="/note" replace /> : <>{children}</>;
};

export const ProtectedRoute = ({ children }) => {
  return auth.currentUser ? <>{children}</> : <Navigate to="/auth" replace />;
};
