import { FC } from 'react';

import { ButtonEventType } from '../../../types/types';
import Button from '../../Button';

import Icon, { IconName } from '../../icons/Icon';
import FormLabel from '../FormLabel';
import Input, { InputProps } from '../Input';
import './_number-step.scss';

type OmittedProps = Omit<
  InputProps,
  'className' | 'type' | 'checked' | 'placeholder' | 'autoComplete'
>;

interface NumberStepProps extends OmittedProps {
  onNumberStepChange: (
    event: ButtonEventType | undefined,
    count: number,
  ) => void;
  initCount?: number;
}

const NumberStep: FC<NumberStepProps> = ({
  onChange,
  onNumberStepChange,
  value,
  initCount = 1,
  inputHasNoLabel,
  min = 0,
  max,
  labelText,
  id,
  name,
}) => (
  <article className="number-step">
    <FormLabel
      inputLabel={labelText}
      id={id}
      inputHasNoLabel={inputHasNoLabel}
    />
    <div className="number-step-container">
      <Button
        id="add"
        name={id}
        ariaLabel={`Subtract ${initCount} `}
        disabled={value === Number(min)}
        onClick={(event?: ButtonEventType) =>
          onNumberStepChange(event, value !== Number(min) ? -initCount : 0)
        }
      >
        <Icon iconName={IconName.Subtract} title="Subtract" />
      </Button>
      <Input
        type="number"
        value={value}
        onChange={onChange}
        id={id}
        labelText={labelText}
        inputHasNoLabel
        name={name}
        min={min}
        max={max}
      />
      <Button
        onClick={(event?: ButtonEventType) =>
          onNumberStepChange(event, value !== Number(max) ? initCount : 0)
        }
        ariaLabel={`Add ${initCount} `}
        disabled={value === Number(max)}
        id="subtract"
        name={id}
      >
        <Icon iconName={IconName.Add} title="Add" />
      </Button>
    </div>
  </article>
);

export default NumberStep;
