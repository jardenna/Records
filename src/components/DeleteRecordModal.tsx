import { FC } from 'react';

import Modal from './modal/Modal';

export interface DeleteRecordModalProps {
  modalId: string;
}

const DeleteRecordModal: FC<DeleteRecordModalProps> = ({ modalId }) =>
  modalId && (
    <Modal
      id={modalId}
      modalHeaderText="sss"
      primaryActionBtn={{
        label: 'Click',
        onClick: () => console.log(23),
      }}
      showCloseIcon
    >
      Delete
    </Modal>
  );

export default DeleteRecordModal;
