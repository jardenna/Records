import { FC } from 'react';
import HeaderComp from '../../layout/header/HeaderComp';
import BtnClose from '../BtnClose';

interface ModalHeaderProps {
  modalHeadertext: string;
  onCloseModal?: () => void;
  showCloseIcon?: boolean;
}

const ModalHeader: FC<ModalHeaderProps> = ({
  modalHeadertext,
  onCloseModal,
  showCloseIcon,
}) => (
  <HeaderComp className="modal-header" ariaLabel="Dialog">
    <h2 className="modal-title" id="modal-title">
      {modalHeadertext}
    </h2>
    {showCloseIcon && (
      <BtnClose onClick={onCloseModal} ariaLabel="Close modal" />
    )}
  </HeaderComp>
);

export default ModalHeader;
