import { FC } from 'react';
import { useNavigate } from 'react-router';
import validationSignup from '../../../components/formElements/validation/validateSignup';
import useMessagePopup from '../../../components/messagePopup/useMessagePopup';
import useFormValidation from '../../../hooks/useFormValidation';
import { MainPath } from '../../../layout/nav/enums';
import useLanguage from '../../language/useLanguage';
import { useRegisterMutation } from '../authApiSlice';
import AuthForm from '../components/AuthForm';

const RegisterPage: FC = () => {
  const navigate = useNavigate();
  const { language } = useLanguage();
  const initialState = {
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  };

  const { addMessagePopup } = useMessagePopup();

  const { values, errors, onChange, onBlur, onSubmit } = useFormValidation({
    initialState,
    callback: handleRegisterUser,
    validate: validationSignup,
  });
  const [registerUser, { isLoading }] = useRegisterMutation();

  async function handleRegisterUser() {
    try {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { confirmPassword, ...rest } = values;

      const result = await registerUser(rest).unwrap();
      if (result.success === true) {
        navigate(MainPath.Root);
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
      labelText={language.signup}
      onSubmit={onSubmit}
      isLoading={isLoading}
      legendText={language.userInfo}
      onChange={onChange}
      errors={errors}
      onBlur={onBlur}
      showPasswordPopup
    />
  );
};

export default RegisterPage;
