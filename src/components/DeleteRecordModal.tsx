import { FC } from 'react';

import Modal from './modal/Modal';

interface DeleteRecordModalProps {
  id: string;
}

const DeleteRecordModal: FC<DeleteRecordModalProps> = ({ id }) => (
  <Modal
    id={id}
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
