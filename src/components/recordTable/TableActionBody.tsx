import { FC, memo } from 'react';
import useLanguage from '../../features/language/useLanguage';
import { BtnVariant } from '../../types/enums';
import DeleteRecordModal from '../DeleteRecordModal';
import IconBtn from '../IconBtn';
import IconContent from '../IconContent';
import { IconName } from '../icons/Icon';
import DetailLink from '../shared/DetailLink';
import './scss/_table-actions.scss';

interface TableActionBodyProps {
  id: string | null;
  modalId: string | null;
  name: string;
  onOpenModal: () => void;
  onViewAlbum: () => void;
  to: string;
}

const TableActionBody: FC<TableActionBodyProps> = ({
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
      <div className="table-action-body">
        <IconBtn
          iconName={IconName.Eye}
          title={language.albumDetails}
          ariaLabel={language.albumDetails}
          onClick={onViewAlbum}
        />
        <DetailLink btnVariant={BtnVariant.Ghost} to={to}>
          <IconContent iconName={IconName.Edit} title={language.updateAlbum} />
        </DetailLink>
        <IconBtn
          iconName={IconName.Trash}
          className="danger"
          title={language.deleteAlbum}
          ariaLabel={language.deleteAlbum}
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

export default memo(TableActionBody);
