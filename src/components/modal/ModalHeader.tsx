import { FC } from 'react';
import HeaderComp from '../../layout/header/HeaderComp';
import BtnClose from '../BtnClose';
import useLanguage from '../../features/language/useLanguage';

interface ModalHeaderProps {
  modalHeadertext: string;
  onCloseModal?: () => void;
  showCloseIcon?: boolean;
}

const ModalHeader: FC<ModalHeaderProps> = ({
  modalHeadertext,
  onCloseModal,
  showCloseIcon,
}) => {
  const { language } = useLanguage();
  return (
    <HeaderComp className="modal-header" ariaLabel="Dialog">
      <h2 className="modal-title" id="modal-title">
        {modalHeadertext}
      </h2>
      {showCloseIcon && (
        <BtnClose onClick={onCloseModal} ariaLabel={language.closeDialog} />
      )}
    </HeaderComp>
  );
};

export default ModalHeader;
