import { FC } from 'react';
import useLanguage from '../../features/language/useLanguage';
import { BaseMainTableProps } from '../recordTable/MainTable';
import SelectBox from '../selectBox/SelectBox';
import './_record-select.scss';

const RecordSelect: FC<BaseMainTableProps> = ({
  startRow,
  endRow,
  totalRows,
  options,
  onChange,
  defaultValue,
}) => {
  const { language } = useLanguage();
  return (
    <div className="record-select-container">
      <p>
        {language.showing} {startRow} {language.to} {endRow} {language.of}{' '}
        {totalRows} {language.albumsSmall}
      </p>
      <form onSubmit={(event) => event.preventDefault()}>
        <SelectBox
          name="limit"
          options={options}
          id="limit"
          onChange={onChange}
          labelText={language.resultsPerPage}
          inputHasNoLabel
          defaultValue={defaultValue}
        />
      </form>
    </div>
  );
};

export default RecordSelect;
