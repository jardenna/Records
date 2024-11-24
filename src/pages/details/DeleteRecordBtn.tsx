import { FC } from 'react';
import { useAppDispatch } from '../../app/hooks';
import Button from '../../components/Button';
import { openModal } from '../../features/modal';

interface DeleteRecordBtnProps {
  btnText: string;
  id: string;
}

const DeleteRecordBtn: FC<DeleteRecordBtnProps> = ({ id, btnText }) => {
  const dispatch = useAppDispatch();
  const handleLogin = () => {
    dispatch(openModal(id));
  };

  return (
    <Button className="btn-danger" onClick={handleLogin}>
      {btnText}
    </Button>
  );
};

export default DeleteRecordBtn;
