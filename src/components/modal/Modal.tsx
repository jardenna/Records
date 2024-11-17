import React, { ReactNode, useEffect, useState } from 'react';
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
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (modalId === id) {
      setIsVisible(true);
      modalRef.current?.showModal();
    } else {
      setIsVisible(false);
      setTimeout(() => modalRef.current?.close(), 500); // Match the animation duration
    }
  }, [modalId, id]);

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
          onCloseModal={() => {
            setIsVisible(false);
            setTimeout(handleCloseModal, 500); // Match the animation duration
          }}
          showCloseIcon={showCloseIcon}
        />
        {primaryActionBtn?.buttonType !== 'submit' ? (
          <>
            <div className="modal-body">{children}</div>
            <ModalFooter
              onCloseModal={() => {
                setIsVisible(false);
                setTimeout(handleCloseModal, 500); // Match the animation duration
              }}
              primaryActionBtn={primaryActionBtn}
              secondaryActionBtn={secondaryActionBtn}
            />
          </>
        ) : (
          <form method="modal" className="modal-form">
            {children}
            <ModalFooter
              onCloseModal={() => {
                setIsVisible(false);
                setTimeout(handleCloseModal, 500); // Match the animation duration
              }}
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
