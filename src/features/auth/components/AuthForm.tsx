import { FC } from 'react';
import VisuallyHidden from '../../../components/VisuallyHidden';
import Figure from '../../../components/figure/Figure';
import Input from '../../../components/formElements/Input';
import Form from '../../../components/formElements/form/Form';
import { ChangeInputType, FormEventType } from '../../../types/types';
import useLanguage from '../../language/useLanguage';
import './_auth-form.scss';

export interface User {
  email: string;
  password: string;
  confirmPassword?: string;
  username?: string;
}

interface AuthFormProps {
  isLoading: boolean;
  labelText: string;
  legendText: string;
  onChange: (event: ChangeInputType) => void;
  onSubmit: (event: FormEventType) => void;
  values: User;
}

const AuthForm: FC<AuthFormProps> = ({
  values,
  onSubmit,
  isLoading,
  onChange,
  labelText,
  legendText,
}) => {
  const { language } = useLanguage();

  return (
    <section className="auth">
      <Figure src="/images/login_img.jpg" alt="" />

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
            />
          )}
          <Input
            name="email"
            id="email"
            value={values.email}
            labelText={language.email}
            onChange={onChange}
            required
          />
          <Input
            name="password"
            id="password"
            value={values.password}
            labelText={language.password}
            onChange={onChange}
            required
          />
          {values.confirmPassword !== undefined && (
            <Input
              name="confirmPassword"
              id="confirmPassword"
              value={values.confirmPassword}
              labelText={language.confirmPassword}
              onChange={onChange}
              required
            />
          )}
        </fieldset>
      </Form>
    </section>
  );
};

export default AuthForm;
