import { Navigate, useLocation } from 'react-router-dom';

function ProtectedRoute({ children }) {
  const isAuthenticated = !!localStorage.getItem('authToken'); // Example check
  const location = useLocation();

  if (!isAuthenticated) {
    // Store the path the user attempted to access
    localStorage.setItem('redirectTo', location.pathname);
    return <Navigate to="/login" />;
  }

  return children;
}

export default ProtectedRoute;
