import React from 'react';
import { Navigate, Outlet, useLocation } from 'react-router';
import { MainPath } from '../../../layout/nav/enums';
import useAuth from '../hooks/useAuth';

const ProtectedRoute: React.FC = () => {
  const location = useLocation();
  const { currentUser } = useAuth();

  if (!currentUser) {
    return <Navigate to={MainPath.Login} state={{ from: location }} replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
