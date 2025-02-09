import { FC } from 'react';
import { useLocation, useNavigate } from 'react-router';
import useFormValidation from '../../../hooks/useFormValidation';
import { MainPath } from '../../../layout/nav/enums';
import useLanguage from '../../language/useLanguage';
import { useLoginMutation } from '../authApiSlice';
import AuthForm from '../components/AuthForm';

const LoginPage: FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { language } = useLanguage();
  const initialState = {
    email: '',
    password: '',
  };
  const from = location.state?.from?.pathname || MainPath.Root;
  const { values, onChange, onSubmit } = useFormValidation({
    initialState,
    callback: handleLoginUser,
  });
  const [loginUser, { isLoading }] = useLoginMutation();

  async function handleLoginUser() {
    try {
      const result = await loginUser(values).unwrap();
      if (result.success) {
        navigate(from, { replace: true });
      } else {
        console.log(result.message);
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <AuthForm
      values={values}
      labelText={language.login}
      onSubmit={onSubmit}
      isLoading={isLoading}
      legendText={language.userInfo}
      onChange={onChange}
    />
  );
};

export default LoginPage;
