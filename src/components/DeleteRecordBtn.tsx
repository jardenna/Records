import { FC } from 'react';
import Button from './Button';
import DeleteRecordModal from './DeleteRecordModal';
import Icon, { IconName } from './icons/Icon';
import { PrimaryActionBtnProps, SecondaryActionBtnProps } from './modal/Modal';

interface DeleteRecordBtnProps {
  onOpenModal: () => void;
  primaryActionBtn: PrimaryActionBtnProps;
  recordId: string;
  secondaryActionBtn?: SecondaryActionBtnProps;
}

const DeleteRecordBtn: FC<DeleteRecordBtnProps> = ({
  onOpenModal,
  recordId,
  primaryActionBtn,
  secondaryActionBtn,
}) => (
  <>
    <Button className="btn-danger" onClick={onOpenModal}>
      <Icon title="" name={IconName.Undo} />
    </Button>
    <DeleteRecordModal
      modalId={recordId}
      primaryActionBtn={primaryActionBtn}
      secondaryActionBtn={secondaryActionBtn}
    />
  </>
);

export default DeleteRecordBtn;
