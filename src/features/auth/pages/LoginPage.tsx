import { FC } from 'react';
import FieldSet from '../../../components/fieldset/FieldSet';
import Form from '../../../components/formElements/form/Form';
import Input from '../../../components/formElements/Input';
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
    <Form labelText={language.login} onSubmit={onSubmit} isLoading={isLoading}>
      <FieldSet legendText={language.userInfo}>
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
      </FieldSet>
    </Form>
  );
};

export default LoginPage;
