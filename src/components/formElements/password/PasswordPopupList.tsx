import { FC } from 'react';
import PasswordPopupItem from './PasswordPopupItem';

interface PasswordPopupListProps {
  inputValue: string;
}

const PasswordPopupList: FC<PasswordPopupListProps> = ({ inputValue }) => {
  const passwordRequirements = [
    'Mindst 8 tegn',
    'Mindst ét tal',
    'Mindst ét lille bogstav',
    'Mindst ét stort bogstav',
    'Mindst ét specielt tegn',
  ];

  return (
    <article>
      <ul className="popup-item-list">
        {passwordRequirements.map((requirement) => (
          <PasswordPopupItem
            text={requirement}
            key={requirement}
            inputValue={inputValue}
          />
        ))}
      </ul>
    </article>
  );
};

export default PasswordPopupList;
