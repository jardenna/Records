import React, { useRef } from 'react';
import { useAppSelector } from '../../app/hooks';
import { selectModal } from '../../features/modal';
import useVisibility from '../../hooks/useVisibility';
import { BtnVariant, SizeVariant } from '../../types/enums';
import { BtnType } from '../../types/types';
import Portal from '../Portal';
import './_modal.scss';
import ModalFooter from './ModalFooter';
import ModalHeader from './ModalHeader';

export interface PrimaryActionBtnProps {
  label: string | null;
  onClick: () => void;
  buttonType?: BtnType;
}

export interface SecondaryActionBtnProps extends PrimaryActionBtnProps {
  variant?: BtnVariant;
}

interface ModalProps {
  children: React.ReactNode;
  id: string;
  modalHeaderText: string;
  className?: string;
  isAlert?: boolean;
  modalSize?: SizeVariant;
  primaryActionBtn?: PrimaryActionBtnProps;
  secondaryActionBtn?: SecondaryActionBtnProps;
  showCloseIcon?: boolean;
}

const Modal: React.FC<ModalProps> = ({
  id,
  modalHeaderText,
  children,
  className = '',
  modalSize = 'sm',
  isAlert,
  primaryActionBtn,
  secondaryActionBtn,
  showCloseIcon,
}) => {
  const modalId = useAppSelector(selectModal);
  const modalRef = useRef<HTMLDialogElement>(null);
  const { isVisible, handleClose } = useVisibility(modalId === id, () =>
    modalRef.current?.close(),
  );

  if (!modalId) {
    return null;
  }

  return (
    <Portal portalId="modal">
      <dialog
        ref={modalRef}
        className={`modal top-center modal-${modalSize} ${className} ${isVisible ? 'transition' : 'dismissed'}`}
        role={isAlert ? 'alert' : undefined}
      >
        <ModalHeader
          modalHeadertext={modalHeaderText}
          onCloseModal={handleClose}
          showCloseIcon={showCloseIcon}
        />
        <div className="modal-body">{children}</div>
        <ModalFooter
          onCloseModal={handleClose}
          primaryActionBtn={primaryActionBtn}
          secondaryActionBtn={secondaryActionBtn}
        />
      </dialog>
    </Portal>
  );
};

export default Modal;
