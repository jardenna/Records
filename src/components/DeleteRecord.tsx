import { FC } from 'react';

import { ModalId } from '../types/enums';
import Modal from './modal/Modal';

interface DeleteRecordProps {
  id: ModalId;
}

const DeleteRecord: FC<DeleteRecordProps> = ({ id }) => (
  <Modal
    id={id}
    modalHeaderText="sss"
    primaryActionBtn={{
      label: 'Click',
      onClick: () => console.log(12),
    }}
    showCloseIcon
  >
    Delete
  </Modal>
);

export default DeleteRecord;
