import { useEffect, useRef, useState } from 'react';
import { BlurEventType, ChangeInputType } from '../types/types';

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
  initialState: T;
  callback?: (values: T) => void;
  isArray?: boolean;
  validate?: (values: KeyValuePair<string>) => KeyValuePair<string>;
}

function useFormValidation<T extends KeyValuePair<any>>({
  initialState,
  callback,
  validate,
  isArray,
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

  const onCustomChange = (name: string, value: Date | string) => {
    if (isArray) {
      setValues({
        ...values,
        [name]: values[name]?.includes(value)
          ? values[name] // Don't add if it already exists
          : [...values[name], value], // Add the new value if it's not in the array
      });
    } else {
      setValues({
        ...values,
        [name]: value,
      });
    }
  };

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

  const onSubmit = () => {
    const validationErrors = validate ? validate(values) : {};
    const formHasNoErrors = !Object.keys(validationErrors).length;

    if (formHasNoErrors) {
      setIsSubmitting(true);
      if (callback) {
        callback(values);
      }
    } else {
      setErrors(validationErrors);
      scrollToFirstError();
    }
  };

  return {
    onSubmit,
    onChange,
    onCustomChange,
    onBlur,
    values,
    errors,
    onClearAll,
    inputRefs,
  };
}

export default useFormValidation;
