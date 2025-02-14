import { FC } from 'react';
import useLanguage from '../../features/language/useLanguage';
import IconBtn from '../IconBtn';
import { IconName } from '../icons/Icon';

interface ActionHeaderProps {
  onClearAllSearch: () => void;
}

const ActionHeader: FC<ActionHeaderProps> = ({ onClearAllSearch }) => {
  const { language } = useLanguage();
  return (
    <th>
      <div className="action-header">
        {language.actions}
        <IconBtn
          iconName={IconName.Undo}
          title={language.resetFiltersAndSorting}
          onClick={onClearAllSearch}
        />
      </div>
    </th>
  );
};

export default ActionHeader;
