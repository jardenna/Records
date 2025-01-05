import { FC } from 'react';
import Select, {
  GroupBase,
  MultiValue,
  OptionsOrGroups,
  SelectComponentsConfig,
  SingleValue,
} from 'react-select';
import FormLabel from './FormLabel';

export type Option = { label: string; value: number | string; count?: number };
export type SelectedOption = SingleValue<Option> | MultiValue<Option>;

interface SelectBoxProps {
  defaultValue: Option | Option[] | null;
  id: string;
  labelText: string;
  name: string;
  onChange: (value: SelectedOption) => void;
  options: OptionsOrGroups<Option, GroupBase<Option>>;
  className?: string;
  closeMenuOnSelect?: boolean;
  components?: SelectComponentsConfig<Option, boolean, GroupBase<Option>>;
  inputHasNoLabel?: boolean;
  inputValue?: string;
  isMulti?: boolean;
  isSearchable?: boolean;
  onInputChange?: (value: string) => void;
  placeholder?: string;
  required?: boolean;
}

const SelectBox: FC<SelectBoxProps> = ({
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
  isSearchable = false,
  onInputChange,
  defaultValue,
  inputValue,
  components,
}) => {
  const handleChange = (newValue: SelectedOption) => {
    if (isMulti) {
      onChange((newValue as Option[]) || []);
    } else {
      onChange(newValue as Option);
    }
  };

  return (
    <div className="input-container">
      <FormLabel
        required={required}
        inputLabel={labelText}
        id={id}
        inputHasNoLabel={inputHasNoLabel}
      />
      <Select
        name={name}
        options={options}
        inputId={id}
        onChange={handleChange}
        placeholder={placeholder}
        classNamePrefix="select-box"
        hideSelectedOptions={false}
        onInputChange={onInputChange}
        closeMenuOnSelect={closeMenuOnSelect}
        isMulti={isMulti}
        className={className}
        inputValue={inputValue}
        menuPlacement="auto"
        defaultValue={defaultValue}
        isSearchable={isSearchable}
        components={components}
      />
    </div>
  );
};
export default SelectBox;
