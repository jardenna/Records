import React from 'react';
import { useAppSelector } from '../../app/hooks';
import { selectModalId } from '../../features/modalSlice';
import useVisibility from '../../hooks/useVisibility';
import { BtnVariant, SizeVariant } from '../../types/enums';
import { BtnType } from '../../types/types';
import Overlay from '../overlay/Overlay';
import Portal from '../Portal';
import './_modal.scss';
import ModalFooter from './ModalFooter';
import ModalHeader from './ModalHeader';
import useModal from './useModal';

export interface PrimaryActionBtnProps {
  label: string | null;
  onClick: () => void;
  buttonType?: BtnType;
}

export interface SecondaryActionBtnProps {
  label: string | null;
  buttonType?: BtnType;
  onClick?: () => void;
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
  isAlert,
  modalSize = 'sm',
  className = '',
  showCloseIcon = true,
  secondaryActionBtn,
  primaryActionBtn,
}) => {
  const modalId = useAppSelector(selectModalId);
  const { handleCloseModal, modalRef } = useModal(modalId);

  const { handleClosePopup, popupClass } = useVisibility(
    modalId === id,
    handleCloseModal,
  );

  if (!modalId) {
    return null;
  }

  return (
    <Portal portalId="modal">
      <dialog
        ref={modalRef}
        className={`modal animate-top-center modal-${modalSize} ${className} ${popupClass}`}
        role={isAlert ? 'alert' : undefined}
      >
        <ModalHeader
          modalHeadertext={modalHeaderText}
          onCloseModal={handleClosePopup}
          showCloseIcon={showCloseIcon}
        />
        {primaryActionBtn?.buttonType !== 'submit' ? (
          <>
            <div className="modal-body">{children}</div>
            <ModalFooter
              onCloseModal={handleClosePopup}
              primaryActionBtn={primaryActionBtn}
              secondaryActionBtn={secondaryActionBtn}
            />
          </>
        ) : (
          <form method="modal" className="modal-form">
            {children}
            <ModalFooter
              onCloseModal={handleClosePopup}
              primaryActionBtn={primaryActionBtn}
              secondaryActionBtn={secondaryActionBtn}
            />
          </form>
        )}
      </dialog>
      <Overlay />
    </Portal>
  );
};

export default Modal;
