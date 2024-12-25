import { FC } from 'react';
import { useAppDispatch } from '../../app/hooks';
import Button from '../../components/Button';
import DeleteRecordModal, {
  DeleteRecordModalProps,
} from '../../components/DeleteRecordModal';
import {
  PrimaryActionBtnProps,
  SecondaryActionBtnProps,
} from '../../components/modal/Modal';
import { toggleModal } from '../../features/modalSlice';
import { useDeleteRecordMutation } from '../../features/records/recordsApiSlice';

interface DeleteRecordBtnProps extends DeleteRecordModalProps {
  btnText: string;
}

const DeleteRecordBtn: FC<DeleteRecordBtnProps> = ({ modalId, btnText }) => {
  const dispatch = useAppDispatch();
  const handleOpenModal = () => {
    if (modalId) {
      dispatch(toggleModal(modalId));
    }
  };

  const [deleteRecord] = useDeleteRecordMutation();

  const handleDeleteRecord = () => {
    deleteRecord(modalId);
  };

  const primaryActionBtn: PrimaryActionBtnProps = {
    label: 'Delete',
    onClick: handleDeleteRecord,
  };

  const secondaryActionBtn: SecondaryActionBtnProps = {
    label: 'Annuller',
  };

  return (
    <>
      <Button className="btn-danger" onClick={handleOpenModal}>
        {btnText}
      </Button>
      <DeleteRecordModal
        modalId={modalId}
        primaryActionBtn={primaryActionBtn}
        secondaryActionBtn={secondaryActionBtn}
      />
    </>
  );
};

export default DeleteRecordBtn;
