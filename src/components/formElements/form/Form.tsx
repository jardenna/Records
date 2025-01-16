import { FC, ReactNode } from 'react';
import useLanguage from '../../../features/language/useLanguage';
import LayoutElement from '../../../layout/LayoutElement';
import { FormEventType } from '../../../types/types';
import Button from '../../Button';
import './_form.scss';

interface FormProps {
  children: ReactNode;
  labelText: string;
  onSubmit: (event: FormEventType) => void;
  ariaLabel?: string;
  className?: string;
  isLoading?: boolean;
}

const Form: FC<FormProps> = ({
  children,
  onSubmit,
  labelText,
  className = '',
  isLoading,
  ariaLabel,
}) => {
  const { language } = useLanguage();
  console.log(ariaLabel);

  return (
    <form onSubmit={onSubmit} noValidate className={className}>
      {children}
      <LayoutElement className="form-footer" ariaLabel={language.form}>
        <Button type="submit" isLoading={isLoading} ariaLabel={ariaLabel}>
          {labelText}
        </Button>
      </LayoutElement>
    </form>
  );
};

export default Form;
