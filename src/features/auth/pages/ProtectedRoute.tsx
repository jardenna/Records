import React from 'react';
import { Navigate, Outlet, useLocation } from 'react-router';
import Skeleton from '../../../components/skeleton/Skeleton';
import { MainPath } from '../../../types/enums';
import { useCheckAuthQuery } from '../authApiSlice';

const ProtectedRoute: React.FC = () => {
  const location = useLocation();
  const { data: userProfile, isLoading } = useCheckAuthQuery();

  if (isLoading) {
    return (
      <div>
        <Skeleton count={4} />
      </div>
    );
  }

  return userProfile ? (
    <Outlet />
  ) : (
    <Navigate to={MainPath.Login} state={{ from: location }} replace />
  );
};

export default ProtectedRoute;
