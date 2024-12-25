import { FC } from 'react';
import FooterComp from '../../layout/FooterComp';
import Button from '../Button';
import { PrimaryActionBtnProps, SecondaryActionBtnProps } from './Modal';

interface modalFooterProps {
  primaryActionBtn: PrimaryActionBtnProps;
  onCloseModal?: () => void;
  secondaryActionBtn?: SecondaryActionBtnProps;
}

const ModalFooter: FC<modalFooterProps> = ({
  primaryActionBtn,
  onCloseModal,
  secondaryActionBtn,
}) => {
  const handlePrimaryBtnClick = () => {
    if (onCloseModal) {
      primaryActionBtn.onClick();
      onCloseModal();
    }
  };

  return (
    <FooterComp className="modal-footer" ariaLabel="dialog">
      <Button
        onClick={handlePrimaryBtnClick}
        type={primaryActionBtn.buttonType}
        className={primaryActionBtn.className || 'btn-danger'}
      >
        {primaryActionBtn.label}
      </Button>
      {secondaryActionBtn && secondaryActionBtn.label && (
        <Button
          onClick={secondaryActionBtn.onClick || onCloseModal}
          variant={secondaryActionBtn.variant}
        >
          {secondaryActionBtn.label}
        </Button>
      )}
    </FooterComp>
  );
};

export default ModalFooter;
