import { useEffect, useRef, useState } from 'react';
import { BlurEventType, ChangeInputType, FormEventType } from '../types/types';

export interface KeyValuePair<T> {
  [key: string]: T;
}

export type ValidationErrors = {
  [key: string]: string;
};

export type FormValues = {
  [key: string]: string | number | string[];
};

interface FormValidationProps<T extends KeyValuePair<any>> {
  callback: (values: T) => void;
  initialState: T;
  validate?: (values: KeyValuePair<string>) => KeyValuePair<string>;
}

function useFormValidation<T extends KeyValuePair<any>>({
  initialState,
  callback,
  validate,
}: FormValidationProps<T>) {
  const [values, setValues] = useState<T>(initialState);
  const [errors, setErrors] = useState<KeyValuePair<string>>({});
  const [touched, setTouched] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const inputRefs = useRef<Record<string, HTMLInputElement | null>>({});

  useEffect(() => {
    if (isSubmitting) {
      const noErrors = !Object.keys(errors).length;
      if (noErrors) {
        setTouched([]);
      }
      setIsSubmitting(false);
    }
  }, [errors]);

  function onChange(event: ChangeInputType) {
    const { name, value, type, checked } = event.target;

    setValues({
      ...values,
      [name]: type === 'number' ? Number(value) : value,
    });

    if (type === 'checkbox') {
      setValues(() => {
        const currentValues = values[name] as string[];
        if (checked) {
          return {
            ...values,
            [name]: [...currentValues, value],
          };
        }
        return {
          ...values,
          [name]: currentValues.filter((item) => item !== value),
        };
      });
    }

    if (!touched.includes(name)) {
      setTouched([...touched, name]);
    }

    // Clear the error message when typing
    setErrors((prevErrors) => {
      const updatedErrors = { ...prevErrors };
      delete updatedErrors[name];
      return updatedErrors;
    });
  }

  const onClearAll = () => {
    setValues(initialState);
  };

  const onBlur = (event: BlurEventType) => {
    const { name } = event.target;
    if (!touched.includes(name)) {
      setTouched([...touched, name]);
    }

    // Validate the specific field on blur
    if (validate) {
      const validationErrors = validate(values);
      setErrors((prevErrors) => ({
        ...prevErrors,
        [name]: validationErrors[name],
      }));
    }
  };

  const scrollToFirstError = () => {
    const errorField = Object.keys(errors)[0];
    if (errorField && inputRefs.current[errorField]) {
      inputRefs.current[errorField]?.scrollIntoView({ behavior: 'smooth' });
      inputRefs.current[errorField]?.focus();
    }
  };

  const onSubmit = (event: FormEventType) => {
    event.preventDefault();

    const validationErrors = validate ? validate(values) : {};
    const formHasNoErrors = !Object.keys(validationErrors).length;

    if (formHasNoErrors) {
      setValues(initialState);
      setIsSubmitting(true);
      callback(values);
    } else {
      setErrors(validationErrors);
      scrollToFirstError();
    }
  };

  return {
    onSubmit,
    onChange,
    onBlur,
    values,
    errors,
    onClearAll,
    inputRefs,
  };
}

export default useFormValidation;
