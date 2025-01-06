import { FC, ReactNode } from 'react';
import useLanguage from '../../../features/language/useLanguage';
import FooterComp from '../../../layout/FooterComp';
import { FormEventType } from '../../../types/types';
import Button from '../../Button';
import './_form.scss';

interface FormProps {
  children: ReactNode;
  labelText: string;
  onSubmit: (event: FormEventType) => void;
  className?: string;
  isLoading?: boolean;
}

const Form: FC<FormProps> = ({
  children,
  onSubmit,
  labelText,
  className = '',
  isLoading,
}) => {
  const { language } = useLanguage();

  return (
    <form onSubmit={onSubmit} noValidate className={className}>
      {children}
      <FooterComp className="form-footer" ariaLabel={language.form}>
        <Button type="submit" isLoading={isLoading}>
          {labelText}
        </Button>
      </FooterComp>
    </form>
  );
};

export default Form;
