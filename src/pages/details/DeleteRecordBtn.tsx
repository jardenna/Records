import { FC } from 'react';
import { useAppDispatch } from '../../app/hooks';
import Button from '../../components/Button';
import DeleteRecordModal, {
  DeleteRecordModalProps,
} from '../../components/DeleteRecordModal';
import { openModal } from '../../features/modalSlice';

interface DeleteRecordBtnProps extends DeleteRecordModalProps {
  btnText: string;
}

const DeleteRecordBtn: FC<DeleteRecordBtnProps> = ({ modalId, btnText }) => {
  const dispatch = useAppDispatch();
  const handleOpenModal = () => {
    if (modalId) {
      dispatch(openModal(modalId));
    }
  };

  return (
    <>
      <Button className="btn-danger" onClick={handleOpenModal}>
        {btnText}
      </Button>
      <DeleteRecordModal modalId={modalId} />
    </>
  );
};

export default DeleteRecordBtn;
