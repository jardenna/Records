import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { useCheckAuthQuery } from '../authApiSlice';
import { selectUser, setUser } from '../authSlice';

const useAuth = () => {
  const dispatch = useAppDispatch();
  const currentUser = useAppSelector(selectUser);

  const { data: userProfile, isLoading, error } = useCheckAuthQuery();

  // const handleLogout = async () => {
  //   await logout().unwrap();
  //   dispatch(authApiSlice.util.resetApiState()); // Clear all RTK Query cache
  //   navigate(MainPath.Root);
  // };

  useEffect(() => {
    if (!isLoading) {
      if (userProfile) {
        dispatch(setUser(userProfile));
      } else {
        dispatch(setUser(null));
      }
    }
  }, [userProfile, isLoading, error, dispatch]);

  return { currentUser, isLoading, error };
};

export default useAuth;
