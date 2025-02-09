import { useEffect } from 'react';
import { useNavigate } from 'react-router';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { MainPath } from '../../../layout/nav/enums';
import { useCheckAuthQuery, useSendLogoutMutation } from '../authApiSlice';
import { selectUser, setUser } from '../authSlice';

const useAuth = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const currentUser = useAppSelector(selectUser);
  const [sendLogout, { isSuccess }] = useSendLogoutMutation();

  const { data: userProfile, isLoading, error } = useCheckAuthQuery();

  useEffect(() => {
    if (isSuccess) {
      navigate(MainPath.Root);
    }
  }, [isSuccess, navigate]);

  useEffect(() => {
    if (!isLoading) {
      if (userProfile) {
        dispatch(setUser(userProfile));
      } else {
        dispatch(setUser(null));
      }
    }
  }, [userProfile, isLoading, error, dispatch]);

  return { currentUser, isLoading, error, logout: sendLogout };
};

export default useAuth;
