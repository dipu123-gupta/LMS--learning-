import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const RequireAuth = ({ allowedRole }) => {
  const { isLoggedIn, role, loading } = useSelector((state) => state.auth);

  // ✅ WAIT until auth hydration finishes
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-xl">
        Checking authentication...
      </div>
    );
  }

  // ✅ NOT logged in
  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }

  // ✅ Role not allowed
  if (!allowedRole.includes(role)) {
    return <Navigate to="/denied" replace />;
  }

  // ✅ Access granted
  return <Outlet />;
};

export default RequireAuth;
