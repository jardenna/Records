import React, { ReactNode, useEffect } from 'react';
import { useAppSelector } from '../../app/hooks';
import { selectModal } from '../../features/modal';
import { BtnVariant, SizeVariant } from '../../types/enums';
import { BtnType } from '../../types/types';
import Portal from '../Portal';
import ModalFooter from './ModalFooter';
import ModalHeader from './ModalHeader';
import useModal from './useModal';

import './_modal.scss';

export interface PrimaryActionBtnProps {
  label: string | null;
  onClick: any;
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
  modalInfo?: ReactNode;
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
  showCloseIcon,
  secondaryActionBtn,
  primaryActionBtn,
  modalInfo,
}) => {
  const modalId = useAppSelector(selectModal);
  const { handleCloseModal, modalRef } = useModal(modalId);

  useEffect(() => {
    if (modalId === id) {
      modalRef.current?.showModal();
    } else {
      modalRef.current?.close();
    }
  }, [modalId, id]);

  if (!modalId) {
    return null;
  }

  return (
    <Portal portalId="modal">
      <dialog
        ref={modalRef}
        className={`modal modal-${modalSize} ${className}`}
        role={isAlert ? 'alert' : undefined}
      >
        <ModalHeader
          modalHeadertext={modalHeaderText}
          onCloseModal={handleCloseModal}
          showCloseIcon={showCloseIcon}
        />
        {primaryActionBtn?.buttonType !== 'submit' ? (
          <>
            <div className="modal-body">{children}</div>
            <ModalFooter
              onCloseModal={handleCloseModal}
              primaryActionBtn={primaryActionBtn}
              secondaryActionBtn={secondaryActionBtn}
            />
          </>
        ) : (
          <form method="modal" className="modal-form">
            {children}
            <ModalFooter
              onCloseModal={handleCloseModal}
              primaryActionBtn={primaryActionBtn}
              secondaryActionBtn={secondaryActionBtn}
            />
          </form>
        )}
        {modalInfo && modalInfo}
      </dialog>
    </Portal>
  );
};

export default Modal;
