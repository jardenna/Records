import { FC, ReactNode } from 'react';
import FooterComp from '../../../layout/FooterComp';
import Button from '../../Button';
import './_form.scss';

interface FormProps {
  children: ReactNode;
  labelText: string;
  onSubmit: () => void;
  className?: string;
  isLoading?: boolean;
}

const Form: FC<FormProps> = ({
  children,
  onSubmit,
  labelText,
  className = '',
  isLoading,
}) => (
  <form onSubmit={onSubmit} noValidate className={className}>
    {children}
    <FooterComp className="form-footer" ariaLabel="form">
      <Button type="submit" isLoading={isLoading}>
        {labelText}
      </Button>
    </FooterComp>
  </form>
);

export default Form;
