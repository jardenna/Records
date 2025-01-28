import React, { useEffect } from 'react';
import { useCheckAuthQuery } from '../authApiSlice';

const ProtectedRoute: React.FC = () => {
  const { data, isLoading, isError } = useCheckAuthQuery();
  console.log(data);
  useEffect(() => {
    if (!isLoading && isError) {
      // Redirect to login if user is not authenticated
      //  navigate('/login');
    }
  }, [isLoading, isError]);

  if (isLoading) {
    // Show a loading spinner or message while checking authentication
    return <div>Loading...</div>;
  }

  if (isError) {
    // If not redirected, display a message or nothing for safety
    return <div>Redirecting to login...</div>;
  }

  // If user is authenticated, render the protected content
  return <>hello</>;
};

export default ProtectedRoute;
