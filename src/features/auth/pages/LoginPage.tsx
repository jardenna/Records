import { FC } from 'react';
import { useLocation, useNavigate } from 'react-router';
import useMessagePopup from '../../../components/messagePopup/useMessagePopup';
import useFormValidation from '../../../hooks/useFormValidation';
import { MainPath } from '../../../layout/nav/enums';
import useLanguage from '../../language/useLanguage';
import { useLoginMutation } from '../authApiSlice';
import AuthForm from '../components/AuthForm';
import validationLogin from '../../../components/formElements/validation/validateLogin';

const LoginPage: FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { language } = useLanguage();

  const initialState = {
    email: '',
    password: '',
  };

  const { addMessagePopup } = useMessagePopup();
  const from = location.state?.from?.pathname || MainPath.Root;

  const { values, errors, onChange, onBlur, onSubmit } = useFormValidation({
    initialState,
    callback: handleLoginUser,
    validate: validationLogin,
  });
  const [loginUser, { isLoading: isLoginLoading }] = useLoginMutation();

  async function handleLoginUser() {
    try {
      const result = await loginUser(values).unwrap();

      if (result.success === true) {
        navigate(from, { replace: true });
      }

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

  return (
    <AuthForm
      values={values}
      labelText={language.login}
      onSubmit={onSubmit}
      isLoading={isLoginLoading}
      legendText={language.userInfo}
      onChange={onChange}
      errors={errors}
      onBlur={onBlur}
    />
  );
};

export default LoginPage;
