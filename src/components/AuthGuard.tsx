import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';

interface AuthGuardProps {
  children: React.ReactNode;
  allowedRoles?: ('patient' | 'doctor')[];
}

export function AuthGuard({ children, allowedRoles }: AuthGuardProps) {
  const { isAuthenticated, isLoading, user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoading) {
      if (!isAuthenticated) {
        navigate('/fr/auth/login');
      } else if (allowedRoles && user && !allowedRoles.includes(user.role)) {
        // Redirect based on role
        if (user.role === 'doctor') {
          navigate('/fr/dashboard'); // Doctors go to dashboard
        } else {
          navigate('/fr/dashboard'); // Patients also go to dashboard, or specific patient page
        }
      }
    }
  }, [isAuthenticated, isLoading, user, allowedRoles, navigate]);

  // Show loading spinner while checking auth
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-green-600"></div>
      </div>
    );
  }

  // Don't render children if not authenticated or role not allowed
  if (!isAuthenticated || (allowedRoles && user && !allowedRoles.includes(user.role))) {
    return null;
  }

  return <>{children}</>;
}
