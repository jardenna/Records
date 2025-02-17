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
  onSelectCount,
  defaultValue,
}) => {
  const { language } = useLanguage();
  return (
    <div className="record-select-container">
      <form onSubmit={(event) => event.preventDefault()}>
        <SelectBox
          name="limit"
          options={options}
          id="limit"
          onChange={onSelectCount}
          labelText={language.resultsPerPage}
          inputHasNoLabel
          defaultValue={defaultValue}
        />
      </form>
      <p className="table-count.info">
        {language.showing} {startRow} {language.to} {endRow} {language.of}{' '}
        {totalRows} {language.albumsSmall}
      </p>
    </div>
  );
};

export default RecordSelect;
