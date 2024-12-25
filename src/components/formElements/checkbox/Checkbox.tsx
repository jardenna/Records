import { FC } from 'react';
import { ChangeInputType } from '../../../types/types';
import { CheckboxItems } from '../form/formList';
import Input from '../Input';
import './_checkbox.scss';

interface CheckboxProps {
  checkBoxList: CheckboxItems[];
  onChange: (event: ChangeInputType) => void;
  values: string[];
  formInfoText?: string;
}

const Checkbox: FC<CheckboxProps> = ({
  checkBoxList,
  onChange,
  values,
  formInfoText,
}) => (
  <>
    {checkBoxList.map((checkbox) => (
      <Input
        key={checkbox.label}
        type="checkbox"
        name="selectedItems"
        value={checkbox.label}
        onChange={onChange}
        checked={values.includes(checkbox.label)}
        id={checkbox.label}
        labelText={checkbox.label}
        className="visibility-hidden"
      />
    ))}
    {formInfoText && <section className="form-info">{formInfoText}</section>}
  </>
);

export default Checkbox;
