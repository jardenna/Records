import { FC } from 'react';

import Modal, { PrimaryActionBtnProps } from './modal/Modal';

export interface DeleteRecordModalProps {
  modalId: string;
  primaryActionBtn?: PrimaryActionBtnProps;
}

const DeleteRecordModal: FC<DeleteRecordModalProps> = ({
  modalId,
  primaryActionBtn,
}) =>
  modalId && (
    <Modal
      id={modalId}
      modalHeaderText="sss"
      primaryActionBtn={primaryActionBtn}
      showCloseIcon
    >
      Delete
    </Modal>
  );

export default DeleteRecordModal;
