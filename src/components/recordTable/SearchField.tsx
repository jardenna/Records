import { FC } from 'react';
import useLanguage from '../../features/language/useLanguage';
import { BtnVariant } from '../../types/enums';
import { ChangeInputType } from '../../types/types';
import Button from '../Button';
import Input from '../formElements/Input';
import Icon, { IconName } from '../icons/Icon';
import VisuallyHidden from '../VisuallyHidden';

interface SearchFieldProps {
  onFilterRecords: (e: ChangeInputType) => void;
  onToggleSearchField: (header: string) => void;
  showSearchField: boolean;
  title: string;
  value: string;
}

const SearchField: FC<SearchFieldProps> = ({
  title,
  value,
  showSearchField,
  onFilterRecords,
  onToggleSearchField,
}) => {
  const { language } = useLanguage();

  return (
    <>
      <Button
        variant={BtnVariant.Ghost}
        onClick={() => onToggleSearchField(title)}
      >
        <VisuallyHidden>
          {language.filter} {language[title]}
        </VisuallyHidden>
        <Icon
          ariaHidden
          name={IconName.Filter}
          title={`${language.filter} ${language.title}`}
        />
        {value !== '' && <span className="dot" />}
      </Button>
      <Input
        className={`search-field ${showSearchField ? 'active' : ''}`}
        type="search"
        name={title}
        id={title}
        placeholder="Search"
        value={value}
        onChange={onFilterRecords}
        labelText="Search"
        inputHasNoLabel
      />
    </>
  );
};

export default SearchField;
