import { FC } from 'react';
import useFormValidation from '../../../hooks/useFormValidation';
import useLanguage from '../../language/useLanguage';
import { useRegisterMutation } from '../authApiSlice';
import AuthForm from '../components/AuthForm';

const RegisterPage: FC = () => {
  const { language } = useLanguage();
  const initialState = {
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  };

  const { values, onChange, onSubmit } = useFormValidation({
    initialState,
    callback: handleRegisterUser,
  });
  const [registerUser, { isLoading }] = useRegisterMutation();

  function handleRegisterUser() {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { confirmPassword, ...rest } = values;

    registerUser(rest);
  }

  return (
    <AuthForm
      values={values}
      labelText={language.signup}
      onSubmit={onSubmit}
      isLoading={isLoading}
      legendText={language.userInfo}
      onChange={onChange}
    />
  );
};

export default RegisterPage;
