import { ChangeEvent, FC, RefObject } from 'react';
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
  autoFocus?: boolean;
  checked?: boolean;
  className?: string;
  errorText?: string;
  inputHasNoLabel?: boolean;
  max?: number;
  maxLength?: number;
  min?: number;
  onBlur?: (event: BlurEventType) => void;
  onFocus?: () => void;
  placeholder?: string;
  ref?: RefObject<HTMLInputElement | null>;
  required?: boolean;
  type?: InputType;
}

const Input: FC<InputProps> = ({
  id,
  ref,
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
  autoFocus,
  onFocus,
}) => {
  const inputClassName = `${type === 'checkbox' || type === 'radio' ? 'checkbox-radio-container' : 'input-container'}`;
  const handleOnInput = (event: ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value;
    if (maxLength && inputValue.length > maxLength) {
      // eslint-disable-next-line no-param-reassign
      event.target.value = inputValue.slice(0, maxLength);
    }
  };
  return (
    <div className={inputClassName}>
      <span className="form-label-container">
        <FormLabel
          required={required}
          inputLabel={labelText}
          id={id}
          inputHasNoLabel={inputHasNoLabel}
        />
        {errorText && <FormError errorText={errorText} ariaErrorId={id} />}
      </span>
      {errorText && (
        <span className="error-icon" aria-hidden="true">
          i
        </span>
      )}
      <input
        ref={ref}
        type={type || 'text'}
        name={name}
        checked={checked}
        onChange={onChange}
        className={className}
        value={value}
        autoFocus={autoFocus}
        id={id}
        aria-invalid={errorText ? true : undefined}
        aria-required={required || undefined}
        aria-errormessage={errorText ? id : undefined}
        onBlur={onBlur}
        placeholder={placeholder}
        min={min}
        max={max}
        autoComplete={autoComplete}
        onInput={handleOnInput}
        onFocus={onFocus}
      />
    </div>
  );
};

export default Input;
