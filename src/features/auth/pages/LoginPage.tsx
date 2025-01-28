import { FC } from 'react';
import Form from '../../../components/formElements/form/Form';
import Input from '../../../components/formElements/Input';
import VisuallyHidden from '../../../components/VisuallyHidden';
import useFormValidation from '../../../hooks/useFormValidation';
import useLanguage from '../../language/useLanguage';
import { useLoginMutation } from '../authApiSlice';

interface LoginPageProps {}

const LoginPage: FC<LoginPageProps> = () => {
  const { language } = useLanguage();
  const initialState = {
    email: '',
    password: '',
  };

  const { values, onChange, onSubmit } = useFormValidation({
    initialState,
    callback: handleRegisterUser,
  });
  const [loginUser, { isLoading }] = useLoginMutation();

  // const { data: user } = useCheckAuthQuery();
  // console.log(user);

  function handleRegisterUser() {
    loginUser(values);
  }

  return (
    <Form labelText="Sign up" onSubmit={onSubmit} isLoading={isLoading}>
      <fieldset className="flex column">
        <VisuallyHidden as="legend">{language.additionalInfo}</VisuallyHidden>
        <Input
          name="email"
          id="email"
          value={values.email}
          labelText="Email"
          onChange={onChange}
          required
        />
        <Input
          name="password"
          id="username"
          value={values.password}
          labelText="Password"
          onChange={onChange}
          required
        />
      </fieldset>
    </Form>
  );
};

export default LoginPage;
