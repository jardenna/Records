import { FC } from 'react';
import useLanguage from '../../features/language/useLanguage';
import { ChangeInputType } from '../../types/types';
import Input from '../formElements/Input';
import IconBtn from '../IconBtn';
import { IconName } from '../icons/Icon';

interface SearchFieldProps {
  onFilterRows: (e: ChangeInputType) => void;
  onToggleSearchField: (header: string) => void;
  showSearchField: boolean;
  title: string;
  value: string;
}

const SearchField: FC<SearchFieldProps> = ({
  title,
  value,
  showSearchField,
  onFilterRows,
  onToggleSearchField,
}) => {
  const { language } = useLanguage();

  return (
    <>
      <IconBtn
        title={`${language.filter} ${language.title}`}
        onClick={() => onToggleSearchField(title)}
        iconName={IconName.Filter}
      />
      <Input
        className={`search-field ${showSearchField ? 'active' : ''}`}
        type="search"
        name={title}
        id={title}
        placeholder="Search"
        value={value}
        onChange={onFilterRows}
        labelText="Search"
        inputHasNoLabel
      />
    </>
  );
};

export default SearchField;
