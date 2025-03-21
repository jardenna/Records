import React, { ReactNode } from 'react';
import { useAppSelector } from '../../app/hooks';
import { selectModalId } from '../../features/modalSlice';
import useVisibility from '../../hooks/useVisibility';
import useWindowDimensions from '../../hooks/useWindowDimensions ';
import { BtnVariant, PopupRole, SizeVariant } from '../../types/enums';
import { BtnType } from '../../types/types';
import Overlay from '../overlay/Overlay';
import Portal from '../Portal';
import SwipeContainer from '../SwipeContainer';
import './_modal.scss';
import ModalFooter from './ModalFooter';
import ModalHeader from './ModalHeader';
import useModal from './useModal';

export interface PrimaryActionBtnProps {
  label: string | null;
  onClick: () => void;
  buttonType?: BtnType;
  className?: string;
  variant?: BtnVariant;
}

export interface SecondaryActionBtnProps {
  label: string | null;
  onClick?: () => void;
  variant?: BtnVariant;
}

interface ModalProps {
  children: React.ReactNode;
  id: string;
  modalHeaderText: string;
  primaryActionBtn: PrimaryActionBtnProps;
  className?: string;
  isAlert?: boolean;
  modalInfo?: ReactNode;
  modalSize?: SizeVariant;
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
  const { isMobileSize } = useWindowDimensions();
  const modalId = useAppSelector(selectModalId);
  const { handleCloseModal, modalRef } = useModal(modalId);

  const { handleClosePopup, popupClass } = useVisibility(
    modalId === id,
    handleCloseModal,
  );

  if (!modalId) {
    return null;
  }

  const ModalContent = (
    <>
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
      {modalInfo && modalInfo}
    </>
  );

  return (
    <Portal portalId="modal">
      <dialog
        ref={modalRef}
        className={`modal modal-${modalSize} ${className} ${popupClass} ${isMobileSize ? 'animate-top-right' : 'animate-top-center'}`}
        role={isAlert ? PopupRole.Alert : undefined}
      >
        {isMobileSize ? (
          <SwipeContainer onSwipeRight={handleClosePopup}>
            {ModalContent}
          </SwipeContainer>
        ) : (
          ModalContent
        )}
      </dialog>
      <Overlay />
    </Portal>
  );
};

export default Modal;
