import { FC } from 'react';
import useLanguage from '../../features/language/useLanguage';
import IconBtn from '../IconBtn';
import { IconName } from '../icons/Icon';
import './scss/_table-action-header.scss';

interface ActionHeaderProps {
  onClearAllSearch: () => void;
}

const ActionHeader: FC<ActionHeaderProps> = ({ onClearAllSearch }) => {
  const { language } = useLanguage();
  return (
    <th>
      <div className="table-action-header">
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
