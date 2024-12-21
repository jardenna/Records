import { FC } from 'react';
import Select from 'react-select';
import FormLabel from './FormLabel';

interface CustomSelectProps {
  id: string;
  labelText: string;
  name: string;
  onChange: (newValue: any) => void;
  options: any;
  className?: string;
  closeMenuOnSelect?: boolean;

  inputHasNoLabel?: boolean;
  inputValue?: string;
  isMulti?: boolean;

  onInputChange?: (value: string) => void;

  placeholder?: string;
  required?: boolean;
}

const CustomSelect: FC<CustomSelectProps> = ({
  className = '',
  name,
  id,
  options,
  placeholder = '',
  onChange,

  closeMenuOnSelect,
  isMulti,
  inputHasNoLabel,
  required,
  labelText,

  onInputChange,

  inputValue,
}) => (
  <div>
    <div className="input-container">
      {!inputHasNoLabel && (
        <FormLabel required={required} inputLabel={labelText} id={id} />
      )}
      <Select
        name={name}
        options={options}
        inputId={id}
        onChange={onChange}
        placeholder={placeholder}
        classNamePrefix="select-box"
        hideSelectedOptions={false}
        onInputChange={onInputChange}
        closeMenuOnSelect={closeMenuOnSelect}
        isMulti={isMulti}
        className={className}
        inputValue={inputValue}
        menuPlacement="auto"
      />
    </div>
  </div>
);

export default CustomSelect;
