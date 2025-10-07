import { FC } from 'react';
import { useLocation, useNavigate } from 'react-router';
import validationLogin from '../../../components/formElements/validation/validateLogin';
import useMessagePopup from '../../../components/messagePopup/useMessagePopup';
import useFormValidation from '../../../hooks/useFormValidation';
import { MainPath } from '../../../layout/nav/enums';
import handleApiError from '../../../utils/handleApiError';
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

  const { addMessagePopup } = useMessagePopup();
  const from = location.state?.from?.pathname || MainPath.Root;

  const { values, errors, onChange, onBlur, onSubmit } = useFormValidation({
    initialState,
    callback: handleLoginUser,
    validate: validationLogin,
  });
  const [loginUser, { isLoading }] = useLoginMutation();

  async function handleLoginUser() {
    try {
      const result = await loginUser(values).unwrap();

      if (result.success) {
        navigate(from, { replace: true });
      }

      if (!result.success) {
        handleApiError(result.message, addMessagePopup);
      }
    } catch (error) {
      handleApiError(error, addMessagePopup);
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
      errors={errors}
      onBlur={onBlur}
    />
  );
};

export default LoginPage;
