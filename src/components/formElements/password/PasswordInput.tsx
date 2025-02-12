import { FC, useState } from 'react';
import useLanguage from '../../../features/language/useLanguage';
import { BtnVariant } from '../../../types/enums';
import Button from '../../Button';
import Icon, { IconName } from '../../icons/Icon';
import Input, { InputProps } from '../Input';
import './_password-input.scss';
import PasswordPopupList from './PasswordPopupList';

type OmittedInputProps = Omit<
  InputProps,
  'checked' | 'min' | 'max' | 'maxLength'
>;

interface PasswordInputProps extends OmittedInputProps {
  showPasswordPopup?: boolean;
}
const PasswordInput: FC<PasswordInputProps> = ({
  value,
  id,
  onChange,
  errorText,
  onBlur,
  labelText,
  name,
  inputHasNoLabel,
  ref,
  autoComplete,
  placeholder,
  autoFocus,
  required,
  showPasswordPopup,
}) => {
  const { language } = useLanguage();
  const [showPassword, setShowPassword] = useState(true);

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="password-input-container">
      {showPasswordPopup && <PasswordPopupList inputValue={String(value)} />}
      <Input
        id={id}
        labelText={labelText}
        name={name}
        onChange={onChange}
        value={value}
        errorText={errorText}
        onBlur={onBlur}
        type={!showPassword ? 'text' : 'password'}
        inputHasNoLabel={inputHasNoLabel}
        ref={ref}
        autoComplete={autoComplete}
        placeholder={placeholder}
        autoFocus={autoFocus}
        required={required}
      />
      {!!value && (
        <Button
          variant={BtnVariant.Ghost}
          onClick={handleShowPassword}
          className="toggle-icon-btn"
        >
          {!showPassword ? (
            <Icon
              iconName={IconName.EyeOff}
              title="Eye closed"
              ariaLabel={language.showPassword}
            />
          ) : (
            <Icon
              iconName={IconName.Eye}
              title="Eye"
              ariaLabel={language.hidePassword}
            />
          )}
        </Button>
      )}
    </div>
  );
};

export default PasswordInput;
