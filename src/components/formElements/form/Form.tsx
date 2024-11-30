import { FC, ReactNode } from 'react';
import FooterComp from '../../../layout/FooterComp';
import { FormEventType } from '../../../types/types';
import Button from '../../Button';
import './_form.scss';

interface FormProps {
  children: ReactNode;
  labelText: string;
  onSubmit: (event: FormEventType) => void;
  className?: string;
}

const Form: FC<FormProps> = ({
  children,
  onSubmit,
  labelText,
  className = '',
}) => (
  <form onSubmit={onSubmit} noValidate className={className}>
    {children}

    <FooterComp className="form-footer" ariaLabel="form">
      <Button type="submit">{labelText}</Button>{' '}
      <Button type="submit">{labelText}</Button>
    </FooterComp>
  </form>
);

export default Form;
