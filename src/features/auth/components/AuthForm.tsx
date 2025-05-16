import { FC } from 'react';
import FieldSet from '../../../components/fieldset/FieldSet';
import Input from '../../../components/formElements/Input';
import Form from '../../../components/formElements/form/Form';
import PasswordInput from '../../../components/formElements/password/PasswordInput';
import { PasswordRulesProps } from '../../../components/formElements/password/PasswordPopupList';
import { KeyValuePair } from '../../../hooks/useFormValidation';
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
  errors: KeyValuePair<string>;
  isLoading: boolean;
  labelText: string;
  legendText: string;
  values: User;
  isFocused?: boolean;
  onBlur: (event: BlurEventType) => void;
  onChange: (event: ChangeInputType) => void;
  onFocus?: () => void;
  onSubmit: (event: FormEventType) => void;
  passwordRules?: (value: string) => PasswordRulesProps[];
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
  isFocused,
  onFocus,
}) => {
  const { language } = useLanguage();

  return (
    <Form
      labelText={labelText}
      onSubmit={onSubmit}
      isLoading={isLoading}
      className="auth-form"
    >
      <FieldSet legendText={legendText}>
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
          passwordRules={passwordRules}
          onFocus={onFocus}
          isFocused={isFocused}
          onBlur={onBlur}
          errorText={language[errors.password]}
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
      </FieldSet>
    </Form>
  );
};

export default AuthForm;
