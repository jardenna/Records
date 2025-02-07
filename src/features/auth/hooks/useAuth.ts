import { useEffect } from 'react';
import { useNavigate } from 'react-router';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { MainPath } from '../../../types/enums';
import { useCheckAuthQuery, useLogoutMutation } from '../authApiSlice';
import { clearUser, selectUser, setUser } from '../authSlice';

const useAuth = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const currentUser = useAppSelector(selectUser);
  const [logout] = useLogoutMutation();
  const { data: userProfile, isLoading, error } = useCheckAuthQuery();

  const handleLogout = () => {
    logout();
    dispatch(clearUser());
    navigate(MainPath.Root);
  };

  useEffect(() => {
    if (!isLoading) {
      if (userProfile) {
        dispatch(setUser(userProfile));
      } else {
        dispatch(clearUser());
      }
    }
  }, [userProfile, isLoading, error, dispatch]);

  return { currentUser, isLoading, error, logout: handleLogout };
};

export default useAuth;
