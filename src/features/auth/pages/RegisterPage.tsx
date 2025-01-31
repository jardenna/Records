import { FC } from 'react';
import Form from '../../../components/formElements/form/Form';
import Input from '../../../components/formElements/Input';
import VisuallyHidden from '../../../components/VisuallyHidden';
import useFormValidation from '../../../hooks/useFormValidation';
import useLanguage from '../../language/useLanguage';
import { useRegisterMutation } from '../authApiSlice';

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
    <Form labelText="Sign up" onSubmit={onSubmit} isLoading={isLoading}>
      <fieldset className="flex column">
        <VisuallyHidden as="legend">{language.additionalInfo}</VisuallyHidden>
        <Input
          name="username"
          id="username"
          value={values.username}
          labelText="User name"
          onChange={onChange}
          required
        />
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
          id="password"
          value={values.password}
          labelText="Password"
          onChange={onChange}
          required
        />
        <Input
          name="confirmPassword"
          id="confirmPassword"
          value={values.confirmPassword}
          labelText="Confirm Password"
          onChange={onChange}
          required
        />
      </fieldset>
    </Form>
  );
};

export default RegisterPage;
