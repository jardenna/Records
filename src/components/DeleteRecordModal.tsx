import { FC } from 'react';
import { useLocation, useNavigate } from 'react-router';
import { useAppDispatch } from '../app/hooks';
import useLanguage from '../features/language/useLanguage';
import { toggleModal } from '../features/modalSlice';
import { useDeleteRecordMutation } from '../features/records/recordsApiSlice';
import { MainPath } from '../layout/nav/enums';
import useMessagePopup from './messagePopup/useMessagePopup';
import Modal, { SecondaryActionBtnProps } from './modal/Modal';

export interface DeleteRecordModalProps {
  btnLabel: string;
  id: string;
  modalId: string | null;
  name: string | null;
  shouldNavigate?: boolean;
}

const DeleteRecordModal: FC<DeleteRecordModalProps> = ({
  modalId,
  btnLabel,
  id,
  name,
  shouldNavigate,
}) => {
  const [deleteRecord] = useDeleteRecordMutation();
  const { language } = useLanguage();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { addMessagePopup } = useMessagePopup();
  const handleDeleteAlbum = async () => {
    try {
      const result = await deleteRecord(id).unwrap();

      if (result) {
        addMessagePopup({
          message: `${name} ${language.albumDeleted}`,
          messagePopupType: 'success',
        });
        if (result.success === false) {
          addMessagePopup({
            message: result.message,
            messagePopupType: 'error',
            componentType: 'notification',
          });
        }

        if (shouldNavigate) {
          if (location.search) {
            navigate(`/${MainPath.Records}${location.search}`);
          } else {
            navigate(`/${MainPath.Records}`);
          }
        }
      }
    } catch (error: any) {
      addMessagePopup({
        messagePopupType: 'error',
        message: error.data.message,
        componentType: 'notification',
      });
    }

    dispatch(toggleModal(null));
  };

  const primaryActionBtn = {
    onClick: () => handleDeleteAlbum(),
    label: btnLabel,
  };

  const secondaryActionBtn: SecondaryActionBtnProps = {
    label: language.cancel,
  };

  return (
    modalId && (
      <Modal
        id={modalId}
        modalHeaderText={language.deleteAlbum}
        primaryActionBtn={primaryActionBtn}
        secondaryActionBtn={secondaryActionBtn}
        showCloseIcon
      >
        {language.sureToDelete} {name}
      </Modal>
    )
  );
};

export default DeleteRecordModal;
