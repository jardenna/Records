import React from 'react';
import { Navigate, Outlet, useLocation } from 'react-router';
import Skeleton from '../../../components/skeleton/Skeleton';
import useAuth from '../hooks/useAuth';
import { MainPath } from '../../../layout/nav/enums';

const ProtectedRoute: React.FC = () => {
  const location = useLocation();
  const { currentUser, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div>
        <Skeleton count={4} />
      </div>
    );
  }

  return currentUser ? (
    <Outlet />
  ) : (
    <Navigate to={MainPath.Login} state={{ from: location }} replace />
  );
};

export default ProtectedRoute;
