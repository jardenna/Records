import { FC } from 'react';

import useLanguage from '../features/language/useLanguage';
import Modal, {
  PrimaryActionBtnProps,
  SecondaryActionBtnProps,
} from './modal/Modal';

export interface DeleteRecordModalProps {
  modalId: string;
  name: string | null;
  primaryActionBtn: PrimaryActionBtnProps;
  secondaryActionBtn?: SecondaryActionBtnProps;
}

const DeleteRecordModal: FC<DeleteRecordModalProps> = ({
  modalId,
  primaryActionBtn,
  secondaryActionBtn,
  name,
}) => {
  const { language } = useLanguage();
  return (
    modalId && (
      <Modal
        id={modalId}
        modalHeaderText={language.deleteAlbum}
        primaryActionBtn={primaryActionBtn}
        secondaryActionBtn={secondaryActionBtn}
        showCloseIcon
      >
        {language.sureToDelete} {name}
      </Modal>
    )
  );
};

export default DeleteRecordModal;
