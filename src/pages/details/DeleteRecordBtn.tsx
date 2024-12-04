import { FC } from 'react';
import { useAppDispatch } from '../../app/hooks';
import Button from '../../components/Button';
import DeleteRecordModal, {
  DeleteRecordModalProps,
} from '../../components/DeleteRecordModal';
import { PrimaryActionBtnProps } from '../../components/modal/Modal';
import { openModal } from '../../features/modalSlice';
import { useDeleteRecordMutation } from '../../features/records/recordsApiSlice';

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

  const [deleteRecord] = useDeleteRecordMutation();

  const handleDeleteRecord = () => {
    deleteRecord(modalId);
  };

  const primaryActionBtn: PrimaryActionBtnProps = {
    label: 'delete',
    onClick: handleDeleteRecord,
  };
  return (
    <>
      <Button className="btn-danger" onClick={handleOpenModal}>
        {btnText}
      </Button>
      <DeleteRecordModal
        modalId={modalId}
        primaryActionBtn={primaryActionBtn}
      />
    </>
  );
};

export default DeleteRecordBtn;
