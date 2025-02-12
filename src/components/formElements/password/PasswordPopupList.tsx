import { FC } from 'react';
import PasswordPopupItem from './PasswordPopupItem';

interface PasswordPopupListProps {
  isSuccess: any;
}

const PasswordPopupList: FC<PasswordPopupListProps> = ({ isSuccess }) => {
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
            isSuccess={isSuccess}
          />
        ))}
      </ul>
    </article>
  );
};

export default PasswordPopupList;
