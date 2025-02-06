import { FC } from 'react';
import { useNavigate } from 'react-router';
import useFormValidation from '../../../hooks/useFormValidation';
import { MainPath } from '../../../types/enums';
import useLanguage from '../../language/useLanguage';
import { useLoginMutation } from '../authApiSlice';
import AuthForm from '../components/AuthForm';

const LoginPage: FC = () => {
  const navigate = useNavigate();
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

  async function handleLoginUser() {
    try {
      const result = await loginUser(values).unwrap();
      if (result.success) {
        navigate(`/${MainPath.Create}`);
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
