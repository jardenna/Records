import { FC, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router';
import useFormValidation from '../../../hooks/useFormValidation';
import { MainPath } from '../../../layout/nav/enums';
import useLanguage from '../../language/useLanguage';
import { useLoginMutation } from '../authApiSlice';
import AuthForm from '../components/AuthForm';
import useAuth from '../hooks/useAuth';

const LoginPage: FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { language } = useLanguage();
  const { currentUser, isLoading: isAuthLoading } = useAuth(); // Get current user from auth state
  const initialState = {
    email: '',
    password: '',
  };
  const from = location.state?.from?.pathname || MainPath.Root;

  const { values, onChange, onSubmit } = useFormValidation({
    initialState,
    callback: handleLoginUser,
  });
  const [loginUser, { isLoading: isLoginLoading, isSuccess }] =
    useLoginMutation();

  async function handleLoginUser() {
    try {
      await loginUser(values).unwrap();
    } catch (error) {
      console.log(error);
    }
  }

  // 🚀 NEW: Navigate only after user is fully authenticated
  useEffect(() => {
    if (isSuccess && currentUser) {
      navigate(from, { replace: true });
    }
  }, [isSuccess, currentUser, navigate, from]);

  return (
    <AuthForm
      values={values}
      labelText={language.login}
      onSubmit={onSubmit}
      isLoading={isLoginLoading || isAuthLoading} // Show loading if either login or auth is loading
      legendText={language.userInfo}
      onChange={onChange}
    />
  );
};

export default LoginPage;
