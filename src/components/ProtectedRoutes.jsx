import { Navigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { authAPI } from '../api';

const ProtectedRoutes = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(null);

  useEffect(() => {
    const verifyToken = async () => {
      try {
        const response = await authAPI.verify();
        setIsAuthenticated(response.data.valid);
      } catch (error) {
        setIsAuthenticated(false);
      }
    };

    verifyToken();
  }, []);

  if (isAuthenticated === null) {
    return <div>Loading...</div>;
  }

  return isAuthenticated ? children : <Navigate to="/admin/login" replace />;
};

export default ProtectedRoutes;