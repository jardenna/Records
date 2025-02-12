import { FC } from 'react';
import VisuallyHidden from '../../../components/VisuallyHidden';
import Input from '../../../components/formElements/Input';
import Form from '../../../components/formElements/form/Form';
import PasswordInput from '../../../components/formElements/password/PasswordInput';
import {
  BlurEventType,
  ChangeInputType,
  FormEventType,
} from '../../../types/types';
import useLanguage from '../../language/useLanguage';
import './_auth-form.scss';

export interface User {
  email: string;
  password: string;
  confirmPassword?: string;
  username?: string;
}

interface AuthFormProps {
  errors: any;
  isLoading: boolean;
  labelText: string;
  legendText: string;
  onBlur: (event: BlurEventType) => void;
  onChange: (event: ChangeInputType) => void;
  onSubmit: (event: FormEventType) => void;
  values: User;
  passwordRules?: any;
}

const AuthForm: FC<AuthFormProps> = ({
  values,
  onSubmit,
  isLoading,
  onChange,
  labelText,
  legendText,
  errors,
  onBlur,
  passwordRules,
}) => {
  const { language } = useLanguage();

  return (
    <Form
      labelText={labelText}
      onSubmit={onSubmit}
      isLoading={isLoading}
      className="auth-form"
    >
      <fieldset className="flex column">
        <VisuallyHidden as="legend">{legendText}</VisuallyHidden>
        {values.username !== undefined && (
          <Input
            name="username"
            id="username"
            value={values.username}
            labelText={language.username}
            onChange={onChange}
            required
            errorText={language[errors.username]}
            onBlur={onBlur}
          />
        )}
        <Input
          name="email"
          id="email"
          value={values.email}
          labelText={language.email}
          onChange={onChange}
          required
          errorText={language[errors.email]}
          onBlur={onBlur}
        />
        <PasswordInput
          name="password"
          id="password"
          value={values.password}
          labelText={language.password}
          onChange={onChange}
          required
          errorText={language[errors.password]}
          passwordRules={passwordRules}
        />
        {values.confirmPassword !== undefined && (
          <PasswordInput
            name="confirmPassword"
            id="confirmPassword"
            value={values.confirmPassword}
            labelText={language.confirmPassword}
            onChange={onChange}
            required
            errorText={language[errors.confirmPassword]}
            onBlur={onBlur}
          />
        )}
      </fieldset>
    </Form>
  );
};

export default AuthForm;
