import { FC } from 'react';
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
  <header className="modal-header" aria-label="Dialog">
    <h2 className="modal-title" id="modal-title">
      {modalHeadertext}
    </h2>
    {showCloseIcon && (
      <BtnClose
        onClick={onCloseModal}
        ariaLabel="close"
        className="btn-close"
      />
    )}
  </header>
);

export default ModalHeader;
