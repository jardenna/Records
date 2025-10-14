import { FC } from 'react';
import { BaseMainTableProps } from '../recordTable/MainTable';
import SelectBox from '../selectBox/SelectBox';
import './_record-select.scss';

const RecordSelect: FC<BaseMainTableProps> = ({
  options,
  onSelectCount,
  defaultValue,
  infoText,
  labelText,
}) => (
  <div className="record-select-container">
    <form>
      <SelectBox
        name="limit"
        options={options}
        id="limit"
        onChange={onSelectCount}
        labelText={labelText}
        inputHasNoLabel
        defaultValue={defaultValue}
      />
    </form>
    <p className="table-count.info">{infoText}</p>
  </div>
);

export default RecordSelect;
