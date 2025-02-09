import React from 'react';
import { Navigate, Outlet, useLocation } from 'react-router';
import Skeleton from '../../../components/skeleton/Skeleton';
import { MainPath } from '../../../layout/nav/enums';
import useAuth from '../hooks/useAuth';

const ProtectedRoute: React.FC = () => {
  const location = useLocation();
  const { currentUser, isLoading } = useAuth();

  if (isLoading || currentUser === undefined) {
    return (
      <div>
        <Skeleton count={4} />
      </div>
    );
  }

  if (!currentUser) {
    return <Navigate to={MainPath.Login} state={{ from: location }} replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
