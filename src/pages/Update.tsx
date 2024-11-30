import { FC } from 'react';
import useFormValidation from '../hooks/useFormValidation';

import Input from '../components/formElements/Input';
import Form from '../components/formElements/form/Form';

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
