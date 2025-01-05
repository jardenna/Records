import { FC } from 'react';
import VisuallyHidden from '../VisuallyHidden';

interface FormLabelProps {
  id: string;
  inputLabel: string;
  inputHasNoLabel?: boolean;
  required?: boolean;
}

const FormLabel: FC<FormLabelProps> = ({
  inputLabel,
  id,
  required,
  inputHasNoLabel,
}) =>
  !inputHasNoLabel ? (
    <FormLabel
      required={required}
      inputLabel={inputLabel}
      id={id}
      inputHasNoLabel={inputHasNoLabel}
    />
  ) : (
    <VisuallyHidden as="label" htmlFor={id}>
      {inputLabel}
    </VisuallyHidden>
  );

export default FormLabel;
