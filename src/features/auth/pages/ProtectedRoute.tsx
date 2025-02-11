import React from 'react';
import { Navigate, Outlet, useLocation } from 'react-router';
import { MainPath } from '../../../layout/nav/enums';
import { useCheckAuthQuery } from '../authApiSlice';

const ProtectedRoute: React.FC = () => {
  const { data: userProfile, isLoading } = useCheckAuthQuery();
  const location = useLocation();

  if (!isLoading && !userProfile) {
    return <Navigate to={MainPath.Login} state={{ from: location }} replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
