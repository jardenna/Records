import { FC } from 'react';
import useLanguage from '../../features/language/useLanguage';
import { ChangeInputType } from '../../types/types';
import Input from '../formElements/Input';
import IconBtn from '../IconBtn';
import { IconName } from '../icons/Icon';

interface SearchFieldProps {
  onFilterRows: (e: ChangeInputType) => void;
  onToggleSearchField: () => void;
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
      <div className="position-relative">
        <IconBtn
          title={`${language.filter} ${language.title}`}
          onClick={onToggleSearchField}
          iconName={IconName.Filter}
        />
        {value && <span className="dot" />}
      </div>
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
