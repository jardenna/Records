import { useEffect } from 'react';
import { useNavigate } from 'react-router';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { MainPath } from '../../../types/enums';
import {
  authApiSlice,
  useCheckAuthQuery,
  useLogoutMutation,
} from '../authApiSlice';
import { selectUser, setUser } from '../authSlice';

const useAuth = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const currentUser = useAppSelector(selectUser);
  const [logout] = useLogoutMutation();
  const { data: userProfile, isLoading, error } = useCheckAuthQuery();

  const handleLogout = async () => {
    await logout().unwrap();
    dispatch(authApiSlice.util.resetApiState()); // Clear all RTK Query cache
    navigate(MainPath.Root);
  };

  useEffect(() => {
    if (!isLoading) {
      if (userProfile) {
        dispatch(setUser(userProfile));
      } else {
        dispatch(setUser(null));
      }
    }
  }, [userProfile, isLoading, error, dispatch]);

  return { currentUser, isLoading, error, logout: handleLogout };
};

export default useAuth;
