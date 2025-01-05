import { FC } from 'react';

import FormLabel from './FormLabel';
import { InputProps } from './Input';

type OmittedProps = Omit<
  InputProps,
  'className' | 'type' | 'checked' | 'placeholder' | 'autoComplete' | 'onChange'
>;
interface TextareaProps extends OmittedProps {
  onChange: (event: any) => void;
}

const Textarea: FC<TextareaProps> = ({
  value,
  id,
  name,
  inputHasNoLabel,
  required,
  labelText,
  onChange,
}) => (
  <div className="input-container">
    <span className="form-label-container">
      <FormLabel
        required={required}
        inputLabel={labelText}
        id={id}
        inputHasNoLabel={inputHasNoLabel}
      />
    </span>
    <textarea name={name} id={id} value={value} onChange={onChange} />
  </div>
);

export default Textarea;
