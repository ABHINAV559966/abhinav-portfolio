import { Navigate } from "react-router-dom";
import LoadingScreen from "../common/LoadingScreen";
import { useAuth } from "../../context/AuthContext";

function ProtectedRoute({ children }) {
  const { loading, isAdmin } = useAuth();

  if (loading) {
    return <LoadingScreen />;
  }

  if (!isAdmin) {
    return <Navigate to="/admin/login" replace />;
  }

  return children;
}

export default ProtectedRoute;