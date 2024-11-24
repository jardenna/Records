import { useEffect, useRef } from 'react';
import { useAppDispatch } from '../../app/hooks';

import { closeModal } from '../../features/modal';
import { KeyCode } from '../../types/enums';

const useModal = (modalId?: string | null) => {
  const dispatch = useAppDispatch();
  const modalRef = useRef<HTMLDialogElement | null>(null);

  const handleCloseModal = () => {
    dispatch(closeModal());
  };

  // eslint-disable-next-line consistent-return
  useEffect(() => {
    if (modalRef.current && modalId) {
      const focusableElements = modalRef.current.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
      );

      const firstFocusableElement = focusableElements[0] as HTMLElement | null;
      const lastFocusableElement = focusableElements[
        focusableElements.length - 1
      ] as HTMLElement | null;

      const handleTabKeyPress = (event: KeyboardEvent) => {
        if (event.key === KeyCode.Tab) {
          if (
            event.shiftKey &&
            document.activeElement === firstFocusableElement
          ) {
            event.preventDefault();
            lastFocusableElement?.focus();
          } else if (
            !event.shiftKey &&
            document.activeElement === lastFocusableElement
          ) {
            event.preventDefault();
            firstFocusableElement?.focus();
          }
        }
      };

      modalRef.current.addEventListener('keydown', handleTabKeyPress);

      return () => {
        modalRef.current?.removeEventListener('keydown', handleTabKeyPress);
      };
    }
  }, [modalId, modalRef.current]);

  return { handleCloseModal, modalRef };
};

export default useModal;
