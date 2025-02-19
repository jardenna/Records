import { FC, useRef, useState } from 'react';
import useLanguage from '../../features/language/useLanguage';
import useClickOutside from '../../hooks/useClickOutside';
import { ChangeInputType } from '../../types/types';
import Input from '../formElements/Input';
import IconBtn from '../IconBtn';
import { IconName } from '../icons/Icon';
import VisuallyHidden from '../VisuallyHidden';

interface SearchFieldProps {
  onFilterRows: (e: ChangeInputType) => void;
  title: string;
  value: string;
}

const SearchField: FC<SearchFieldProps> = ({ title, value, onFilterRows }) => {
  const { language } = useLanguage();
  const SearchFieldRef = useRef<HTMLInputElement>(null);
  const text = `${language.filter} ${language[title]}`;
  const [showSearchsField, setShowSearchsField] = useState(false);

  const handleSearchField = () => {
    setShowSearchsField(!showSearchsField);
  };

  useClickOutside(SearchFieldRef, () => setShowSearchsField(false));
  return (
    <div className="position-relative">
      <IconBtn
        title={`${language.filter} ${language.title}`}
        ariaLabel={`${language.filter} ${language.title}`}
        onClick={handleSearchField}
        iconName={IconName.Filter}
      />
      {value && (
        <>
          <VisuallyHidden>{language.filtersApplied}</VisuallyHidden>
          <span className="dot" aria-hidden />
        </>
      )}
      {showSearchsField && (
        <Input
          className={`search-field ${showSearchsField ? 'active' : ''}`}
          type="search"
          name={title}
          id={title}
          placeholder={text}
          value={value}
          onChange={onFilterRows}
          labelText={text}
          inputHasNoLabel
          ref={SearchFieldRef}
          autoFocus
        />
      )}
    </div>
  );
};

export default SearchField;
