import { FC } from 'react';
import useFormValidation from '../hooks/useFormValidation';

import Input from '../components/formElements/Input';
import Checkbox from '../components/formElements/checkbox/Checkbox';
import Form from '../components/formElements/form/Form';
import {
  checkboxItems,
  radioButtonGenderList,
} from '../components/formElements/formList';
import RadioButton from '../components/formElements/radioButton/RadioButton';

interface UpdateProps {}

const Update: FC<UpdateProps> = () => {
  const initialCreateState = {
    artist: '',
    title: '',
    prodYear: '',
    label: '',
    origin: '',
    price: '',
    recordNo: '',
    numOfRecords: '',
    released: '',
    info: '',
    selectedItems: ['Option 1', 'Option 3'],
    genderOption: 'woman',
  };

  const { onSubmit, onChange, onBlur, values, errors } = useFormValidation({
    initialState: initialCreateState,
    callback: handleSubmit,
  });

  function handleSubmit() {
    console.log(values);
  }

  return (
    <section>
      <h1>update</h1>
      <Form onSubmit={onSubmit} labelText="Insert Record">
        <RadioButton
          radioButtonList={radioButtonGenderList}
          name="genderOption"
          initialChecked={values.genderOption}
          onChange={onChange}
          formInfoText="Understanding the gender distribution of our users, helps us to promote diversity and ensure that no group is left out. All data collected is used in accordance with our Privacy Policy."
        />
        <Checkbox
          onChange={onChange}
          values={values.selectedItems}
          checkBoxList={checkboxItems}
        />
        <Input
          name="artist"
          id="artist"
          onChange={onChange}
          onBlur={onBlur}
          errorText={errors.artist}
          value={values.artist}
          labelText="Gruppe / Kunstner"
        />
      </Form>
    </section>
  );
};

export default Update;
