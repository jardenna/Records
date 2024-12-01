import { FC } from 'react';
import { BlurEventType, ChangeInputType, InputType } from '../../types/types';
import FormError from './FormError';
import FormLabel from './FormLabel';

export interface InputProps {
  id: string;
  labelText: string;
  name: string;
  onChange: (event: ChangeInputType) => void;
  value: string | number;
  autoComplete?: string;
  checked?: boolean;
  className?: string;
  errorText?: string;
  inputHasNoLabel?: boolean;
  max?: string;
  maxLength?: number;
  min?: string;
  onBlur?: (event: BlurEventType) => void;
  placeholder?: string;
  required?: boolean;
  type?: InputType;
}

const Input: FC<InputProps> = ({
  id,
  type,
  required,
  labelText,
  name,
  value,
  inputHasNoLabel,
  checked,
  className = '',
  errorText,
  onChange,
  onBlur,
  min,
  max,
  placeholder,
  maxLength,
  autoComplete = 'on',
}) => {
  const inputClassName = `${type === 'checkbox' || type === 'radio' ? 'checkbox-radio-container' : 'input-container'}`;
  const handleOnInput = (event: ChangeInputType) => {
    const inputValue = event.target.value;
    if (maxLength && inputValue.length > maxLength) {
      // eslint-disable-next-line no-param-reassign
      event.target.value = inputValue.slice(0, maxLength);
    }
  };
  return (
    <div className={inputClassName}>
      <span className="form-label-container">
        {!inputHasNoLabel && (
          <FormLabel required={required} inputLabel={labelText} id={id} />
        )}
        {errorText && <FormError errorText={errorText} ariaErrorId={id} />}
      </span>
      {errorText && (
        <span className="error-icon" aria-hidden="true">
          i
        </span>
      )}
      <input
        type={type || 'text'}
        name={name}
        checked={checked}
        onChange={onChange}
        className={className}
        value={value}
        id={id}
        aria-invalid={errorText ? true : undefined}
        aria-required={required || undefined}
        aria-errormessage={errorText ? id : undefined}
        aria-label={inputHasNoLabel ? labelText : undefined}
        onBlur={onBlur}
        placeholder={placeholder}
        min={min}
        max={max}
        autoComplete={autoComplete}
        onInput={handleOnInput}
      />
    </div>
  );
};

export default Input;
