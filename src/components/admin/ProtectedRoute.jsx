import { Navigate, useLocation } from "react-router-dom";
import LoadingScreen from "../common/LoadingScreen";
import { useAuth } from "../../context/AuthContext";

function ProtectedRoute({ children }) {
  const { loading, isAdmin } = useAuth();
  const location = useLocation();

  if (loading) {
    return <LoadingScreen />;
  }

  if (!isAdmin) {
    return (
      <Navigate
        to="/admin/login"
        replace
        state={{ from: location.pathname }}
      />
    );
  }

  return children;
}

export default ProtectedRoute;