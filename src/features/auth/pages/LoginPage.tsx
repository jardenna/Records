import { FC, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router';
import useMessagePopup from '../../../components/messagePopup/useMessagePopup';
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

  const { addMessagePopup } = useMessagePopup();
  const from = location.state?.from?.pathname || MainPath.Root;

  const { values, onChange, onSubmit } = useFormValidation({
    initialState,
    callback: handleLoginUser,
  });
  const [loginUser, { isLoading: isLoginLoading, isSuccess }] =
    useLoginMutation();

  async function handleLoginUser() {
    try {
      const result = await loginUser(values).unwrap();

      if (result.success === false) {
        addMessagePopup({
          message: result.message,
          messagePopupType: 'error',
          componentType: 'notification',
          position: 'top-center',
        });
      }
    } catch (error: any) {
      addMessagePopup({
        messagePopupType: 'error',
        message: error.data.message,
        componentType: 'notification',
        position: 'top-center',
      });
    }
  }

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
      isLoading={isLoginLoading || isAuthLoading}
      legendText={language.userInfo}
      onChange={onChange}
    />
  );
};

export default LoginPage;
