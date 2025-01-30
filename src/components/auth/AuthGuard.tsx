import { Navigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

interface AuthGuardProps {
  children: React.ReactNode;
  requireAuth?: boolean;
}

export function AuthGuard({ children, requireAuth = false }: AuthGuardProps) {
  const { isAuthenticated } = useAuth();

  // If authentication is required and user is not authenticated
  if (requireAuth && !isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // If user is authenticated and trying to access auth pages
  if (isAuthenticated && !requireAuth) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
} 