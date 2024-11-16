import { FC } from 'react';
import Button from '../../components/Button';
import useModal from '../../components/modal/useModal';

interface DeleteRecordBtnProps {
  id: any;
}

const DeleteRecordBtn: FC<DeleteRecordBtnProps> = ({ id }) => {
  const { handleOpenModal } = useModal(id);

  return <Button onClick={handleOpenModal}>Delete</Button>;
};

export default DeleteRecordBtn;
