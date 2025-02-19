import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedRoles?: string[];
}

export function ProtectedRoute({ children, allowedRoles = [] }: ProtectedRouteProps) {
  const { user, profile } = useAuth();
  const location = useLocation();

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // If roles are specified, check if user has permission
  if (allowedRoles.length > 0 && profile) {
    if (!allowedRoles.includes(profile.user_role)) {
      // Redirect to appropriate dashboard based on role
      const redirectPath = profile.user_role === 'organization'
        ? '/organization/dashboard'
        : profile.user_role === 'mentee'
        ? '/mentee/dashboard'
        : '/dashboard';
      
      return <Navigate to={redirectPath} replace />;
    }
  }

  return <>{children}</>;
} 