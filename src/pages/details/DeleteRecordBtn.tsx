import { FC } from 'react';
import Button from '../../components/Button';
import useModal from '../../components/modal/useModal';

interface DeleteRecordBtnProps {
  btnText: string;
  id: string;
}

const DeleteRecordBtn: FC<DeleteRecordBtnProps> = ({ id, btnText }) => {
  const { openModal } = useModal(id);

  return (
    <Button className="btn-danger" onClick={openModal}>
      {btnText}
    </Button>
  );
};

export default DeleteRecordBtn;
