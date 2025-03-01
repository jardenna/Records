import { FC } from 'react';
import SelectBox, { Option } from './selectBox/SelectBox';

interface LanguageSelectProps {
  defaultValue: Option;
  labelText: string;
  onLanguageChange: any;
  // onLanguageChange: (value: SelectedOption) => void;
  options: { label: string; value: string | number }[];
}

const LanguageSelect: FC<LanguageSelectProps> = ({
  onLanguageChange,
  defaultValue,
  options,
  labelText,
}) => (
  <form>
    <SelectBox
      name="language"
      options={options}
      id="language"
      onChange={onLanguageChange}
      labelText={labelText}
      inputHasNoLabel
      defaultValue={defaultValue}
    />
  </form>
);

export default LanguageSelect;
