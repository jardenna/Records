import { FC } from 'react';

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
}) =>
  modalId && (
    <Modal
      id={modalId}
      modalHeaderText="Delete Album"
      primaryActionBtn={primaryActionBtn}
      secondaryActionBtn={secondaryActionBtn}
      showCloseIcon
    >
      Are you sure you want to Delete
    </Modal>
  );

export default DeleteRecordModal;
