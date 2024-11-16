import { FC } from 'react';
import Button from '../../components/Button';
import useModal from '../../components/modal/useModal';

interface DeleteRecordProps {
  id: any;
}

const DeleteRecord: FC<DeleteRecordProps> = ({ id }) => {
  const { handleOpenModal } = useModal(id);

  return <Button onClick={handleOpenModal}>Delete</Button>;
};

export default DeleteRecord;
