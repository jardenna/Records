import { FC } from 'react';
import useFormValidation from '../../../hooks/useFormValidation';
import useLanguage from '../../language/useLanguage';
import { useLoginMutation } from '../authApiSlice';
import AuthForm from '../components/AuthForm';

const LoginPage: FC = () => {
  const { language } = useLanguage();
  const initialState = {
    email: '',
    password: '',
  };

  const { values, onChange, onSubmit } = useFormValidation({
    initialState,
    callback: handleLoginUser,
  });
  const [loginUser, { isLoading }] = useLoginMutation();

  function handleLoginUser() {
    loginUser(values);
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
