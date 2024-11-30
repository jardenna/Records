import { FC } from 'react';

interface FormLabelProps {
  id: string;
  inputLabel: string;
  required?: boolean;
}

const FormLabel: FC<FormLabelProps> = ({ inputLabel, id, required }) => (
  <label className="form-label" htmlFor={id}>
    {inputLabel}
    {required && (
      <span className="text-error" aria-hidden="true">
        *
      </span>
    )}
  </label>
);

export default FormLabel;
