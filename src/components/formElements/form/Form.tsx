import { FC, ReactNode } from 'react';
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
    <Button type="submit">{labelText}</Button>
  </form>
);

export default Form;
