import { FC } from 'react';
import { BtnVariant } from '../../types/enums';
import { ChangeInputType } from '../../types/types';
import Button from '../Button';
import Input from '../formElements/Input';
import Icon, { IconName } from '../icons/Icon';

interface SearchFieldProps {
  onFilterRecords: (e: ChangeInputType) => void;
  onToggleSearchField: (header: string) => void;
  showSearchField: string;
  title: string;
  value: string;
}

const SearchField: FC<SearchFieldProps> = ({
  title,
  value,
  onFilterRecords,
  onToggleSearchField,
  showSearchField,
}) => (
  <>
    <div>
      <Button
        variant={BtnVariant.Ghost}
        onClick={() => onToggleSearchField(title)}
      >
        <Icon name={IconName.Filter} title={`Filter ${title}`} />
      </Button>
    </div>
    <Input
      className={`search-field ${showSearchField === title ? 'active' : ''}`}
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

export default SearchField;
