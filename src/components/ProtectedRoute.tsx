import { Navigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredUserType?: string[];
  requireAdmin?: boolean;
}

const ProtectedRoute = ({ children, requiredUserType, requireAdmin }: ProtectedRouteProps) => {
  const { user, profile, isAdmin, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="w-12 h-12 border-4 border-safe-green border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!user) return <Navigate to="/connexion" replace />;
  if (requireAdmin && !isAdmin) return <Navigate to="/tableau-de-bord" replace />;
  if (requiredUserType && profile && !requiredUserType.includes(profile.user_type)) {
    return <Navigate to="/tableau-de-bord" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
