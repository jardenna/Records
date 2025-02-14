import { FC } from 'react';
import useLanguage from '../../features/language/useLanguage';
import { BtnVariant } from '../../types/enums';
import DeleteRecordModal from '../DeleteRecordModal';
import IconBtn from '../IconBtn';
import IconContent from '../IconContent';
import { IconName } from '../icons/Icon';
import DetailLink from '../shared/DetailLink';

interface ActionBodyProps {
  id: string | null;
  modalId: string;
  name: string;
  onOpenModal: () => void;
  onViewAlbum: () => void;
  to: string;
}

const ActionBody: FC<ActionBodyProps> = ({
  onViewAlbum,
  to,
  onOpenModal,
  modalId,
  id,
  name,
}) => {
  const { language } = useLanguage();
  return (
    <td>
      <div className="action-container">
        <IconBtn
          iconName={IconName.Eye}
          title={language.albumDetails}
          onClick={onViewAlbum}
        />
        <DetailLink btnVariant={BtnVariant.Ghost} to={to}>
          <IconContent iconName={IconName.Edit} title={language.updateAlbum} />
        </DetailLink>
        <IconBtn
          iconName={IconName.Trash}
          className="danger"
          title={language.deleteAlbum}
          onClick={onOpenModal}
        />
        <DeleteRecordModal
          modalId={modalId}
          id={id}
          btnLabel={language.delete}
          name={name}
        />
      </div>
    </td>
  );
};

export default ActionBody;
