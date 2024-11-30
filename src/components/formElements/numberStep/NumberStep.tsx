import { FC } from 'react';

import { ButtonEventType } from '../../../types/types';
import Button from '../../Button';

import Icon, { IconName } from '../../icons/Icon';
import Input from '../Input';
import './_number-step.scss';

interface NumberStepProps {
  id: string;
  labelText: string;
  name: string;
  onChange: (event?: any) => void;
  onNumberStepChange: (event: any, count: number) => void;
  value: number;
  initCount?: number;
  max?: string;
  min?: string;
}

const NumberStep: FC<NumberStepProps> = ({
  onChange,
  onNumberStepChange,
  value,
  initCount = 1,
  min = '0',
  max,
  labelText,
  id,
  name,
}) => (
  <article className="number-step">
    <label htmlFor={id}>{labelText}</label>
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
        <Icon name={IconName.Subtract} title="Subtract" />
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
        <Icon name={IconName.Add} title="Add" />
      </Button>
    </div>
  </article>
);

export default NumberStep;
