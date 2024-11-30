import { FC } from 'react';
import FormLabel from './FormLabel';

interface TextareaProps {
  id: string;
  labelText: string;
  name: string;
  onChange: any;
  value: string;
  inputHasNoLabel?: boolean;
  required?: boolean;
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
  <div className="inputContainer">
    <span className="form-label-container">
      {!inputHasNoLabel && (
        <FormLabel required={required} inputLabel={labelText} id={id} />
      )}
    </span>

    <textarea name={name} id={id} value={value} onChange={onChange} />
  </div>
);

export default Textarea;
