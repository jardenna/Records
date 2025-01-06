import { FC } from 'react';

import useLanguage from '../features/language/useLanguage';
import Modal, {
  PrimaryActionBtnProps,
  SecondaryActionBtnProps,
} from './modal/Modal';

export interface DeleteRecordModalProps {
  modalId: string;
  primaryActionBtn: PrimaryActionBtnProps;
  secondaryActionBtn?: SecondaryActionBtnProps;
}

const DeleteRecordModal: FC<DeleteRecordModalProps> = ({
  modalId,
  primaryActionBtn,
  secondaryActionBtn,
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
        {language.sureToDelete}
      </Modal>
    )
  );
};

export default DeleteRecordModal;
