import React, { useEffect } from 'react';
import { Navigate, Outlet, useNavigate } from 'react-router';
import Skeleton from '../../../components/skeleton/Skeleton';
import { MainPath } from '../../../types/enums';
import { useCheckAuthQuery } from '../authApiSlice';

const ProtectedRoute: React.FC = () => {
  const navigate = useNavigate();
  const { data: userProfile, isLoading, isError } = useCheckAuthQuery();

  useEffect(() => {
    if (!isLoading && userProfile?.success === false) {
      // Redirect to login if user is not authenticated
      navigate('/login');
    }
  }, [isLoading, isError]);

  if (isLoading) {
    return (
      <div>
        <Skeleton count={4} />
      </div>
    );
  }

  return userProfile && userProfile.success === true ? (
    <Outlet />
  ) : (
    <Navigate to={MainPath.Login} />
  );
};

export default ProtectedRoute;
