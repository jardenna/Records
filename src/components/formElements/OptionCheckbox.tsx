import { FC } from 'react';
import { OptionProps } from 'react-select';
import { Option } from './selectbox/SelectBox';

const OptionCheckbox: FC<OptionProps<Option>> = ({
  data,
  innerRef,
  innerProps,
  isDisabled,
  isFocused,
  isSelected,
}) => {
  const className = `custom-option ${isDisabled ? 'disabled' : ''} ${
    isSelected ? 'selected' : ''
  } ${isFocused ? 'focused' : ''}`;

  return (
    <div className={className} ref={innerRef} {...innerProps}>
      <div>
        <input
          type="checkbox"
          checked={isSelected}
          onChange={() => null}
          id={data.label}
        />
        <label htmlFor={data.label}>{data.label}</label>
      </div>
      {data.count && <span>({data.count})</span>}
    </div>
  );
};

export default OptionCheckbox;
