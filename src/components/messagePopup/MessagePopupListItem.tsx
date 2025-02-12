import { FC } from 'react';
import {
  MessagePopup,
  MessagePopupTypes,
} from '../../features/messagePopupSlice';
import { PopupRole } from '../../types/enums';
import BtnClose from '../BtnClose';
import Icon, { IconName } from '../icons/Icon';
import useMessagePopup from './useMessagePopup';

interface MessagePopupListItemProps {
  messagePopup: MessagePopup;
}

const MessagePopupListItem: FC<MessagePopupListItemProps> = ({
  messagePopup,
}) => {
  const { deleteMessagePopup, popupClass } = useMessagePopup(messagePopup.id);
  const messagePopupTypeConfig: Record<
    MessagePopupTypes,
    { iconName: IconName; role: PopupRole; title: string }
  > = {
    success: {
      iconName: IconName.Success,
      title: 'Success Notification',
      role: PopupRole.Status,
    },
    info: {
      iconName: IconName.Info,
      title: 'Information Notification',
      role: PopupRole.Status,
    },
    warning: {
      iconName: IconName.Warning,
      title: 'Warning Notification',
      role: PopupRole.Alert,
    },
    error: {
      iconName: IconName.Error,
      title: 'Error Notification',
      role: PopupRole.Alert,
    },
  };

  const { iconName, title, role } =
    messagePopupTypeConfig[messagePopup.messagePopupType || 'info'];
  return (
    <li
      role={role}
      className={`message-popup-item ${messagePopup.componentType || ''} animate-${messagePopup.position} ${popupClass} ${messagePopup.messagePopupType}`}
    >
      <span className="message-popup-item-info">
        <Icon iconName={iconName} title={title} />
        <p className="message-popup-message">{messagePopup.message}</p>
      </span>
      <BtnClose onClick={deleteMessagePopup} />
    </li>
  );
};

export default MessagePopupListItem;
