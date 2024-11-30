import { FC } from 'react';
import FooterComp from '../../layout/FooterComp';
import Button from '../Button';
import { PrimaryActionBtnProps, SecondaryActionBtnProps } from './Modal';

interface modalFooterProps {
  onCloseModal?: () => void;
  primaryActionBtn?: PrimaryActionBtnProps;
  secondaryActionBtn?: SecondaryActionBtnProps;
}

const ModalFooter: FC<modalFooterProps> = ({
  primaryActionBtn,
  onCloseModal,
  secondaryActionBtn,
}) => (
  <FooterComp className="modal-footer" ariaLabel="dialog">
    {primaryActionBtn && (
      <Button
        onClick={primaryActionBtn.onClick}
        type={primaryActionBtn.buttonType}
      >
        {primaryActionBtn.label}
      </Button>
    )}
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

export default ModalFooter;
