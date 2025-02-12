import { FC, useState } from 'react';
import useLanguage from '../../../features/language/useLanguage';
import { BtnVariant } from '../../../types/enums';
import Button from '../../Button';
import Icon, { IconName } from '../../icons/Icon';
import Progress from '../../progress/Progress';
import Input, { InputProps } from '../Input';
import './_password-input.scss';
import PasswordPopupList, { PasswordRulesProps } from './PasswordPopupList';

type OmittedInputProps = Omit<
  InputProps,
  'checked' | 'min' | 'max' | 'maxLength'
>;

interface PasswordInputProps extends OmittedInputProps {
  isFocused?: boolean;
  passwordRules?: (value: string) => PasswordRulesProps[];
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
  passwordRules,
  isFocused,
  onFocus,
}) => {
  const { language } = useLanguage();
  const testData = [
    { bgcolor: '#6a1b9a', completed: 60 },
    { bgcolor: '#00695c', completed: 30 },
  ];
  const [showPassword, setShowPassword] = useState(true);

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="password-input-container">
      <div className="App">
        {testData.map((item) => (
          <Progress
            key={item.bgcolor}
            bgcolor={item.bgcolor}
            completed={item.completed}
          />
        ))}
      </div>
      {passwordRules && isFocused && (
        <PasswordPopupList
          passwordRules={passwordRules}
          inputValue={String(value)}
        />
      )}
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
        onFocus={onFocus}
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
