import { FC } from 'react';
import useLanguage from '../../features/language/useLanguage';
import SelectBox, { SelectedOption } from '../SelectBox';
import './_record-select.scss';

interface RecordSelectProps {
  defaultValue: any;
  endRow: number;
  onChange: (value: SelectedOption) => void;
  options: { label: string; value: string | number }[];
  startRow: number;
  totalRows: number;
}

const RecordSelect: FC<RecordSelectProps> = ({
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
