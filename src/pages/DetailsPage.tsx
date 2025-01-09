import { FC } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router';
import { useAppDispatch } from '../app/hooks';
import Button from '../components/Button';
import DeleteRecordModal from '../components/DeleteRecordModal';
import DetailsContent from '../components/details/DetailsContent';
import MetaTags from '../components/MetaTags';
import {
  PrimaryActionBtnProps,
  SecondaryActionBtnProps,
} from '../components/modal/Modal';
import DetailLink from '../components/shared/DetailLink';
import RecordImg from '../components/shared/recordImg/RecordImg';
import useLanguage from '../features/language/useLanguage';
import { toggleModal } from '../features/modalSlice';
import {
  useDeleteRecordMutation,
  useGetRecordByIdQuery,
} from '../features/records/recordsApiSlice';
import LayoutElement from '../layout/LayoutElement';
import { MainPath } from '../types/enums';

const DetailsPage: FC = () => {
  const dispatch = useAppDispatch();
  const location = useLocation();
  const { language } = useLanguage();
  const recordParams = useParams();
  const recordId = recordParams.id;
  const navigate = useNavigate();
  const { data: selectedRecord } = useGetRecordByIdQuery(recordId);
  const [deleteRecord] = useDeleteRecordMutation();

  const handleOpenModal = () => {
    if (recordId) {
      dispatch(toggleModal(recordId));
    }
  };

  const handleDeleteRecord = () => {
    deleteRecord(recordId);
    dispatch(toggleModal(null));
    if (location.search) {
      navigate(`/${MainPath.Records}${location.search}`);
    } else {
      navigate(`/${MainPath.Records}`);
    }
  };

  const primaryActionBtn: PrimaryActionBtnProps = {
    label: language.deleteAlbum,
    onClick: handleDeleteRecord,
  };

  const secondaryActionBtn: SecondaryActionBtnProps = {
    label: language.cancel,
  };

  return selectedRecord ? (
    <article className="details">
      <MetaTags
        description="This is the records page description"
        keywords="records, music, artists"
        title={language.albumDetails}
      />
      <RecordImg
        src="/images/default.png"
        alt=""
        title={selectedRecord.artist}
        Subtitle={selectedRecord.title}
      />

      <section className="details-content-container">
        <div>
          <DetailsContent
            text={selectedRecord.prodYear}
            label={language.prodYear}
          />
          <DetailsContent
            text={
              selectedRecord.prodYear ||
              selectedRecord.released ||
              language.noInfo
            }
            label={language.released}
          />
          <DetailsContent
            text={selectedRecord.label?.trim() || language.noInfo}
            label={language.label}
          />
          <DetailsContent
            text={selectedRecord.recordNo?.trim() || language.noInfo}
            label={language.recordNo}
          />
          <DetailsContent
            text={selectedRecord.numOfRecords || 1}
            label={language.numOfRecords}
          />
          <DetailsContent
            text={selectedRecord.origin?.trim() || language.noInfo}
            label={language.origin}
          />
          <DetailsContent
            text={selectedRecord.info?.trim() || language.noInfo}
            label={language.niceToKnow}
          />
          <DetailsContent
            text={`${selectedRecord.price?.trim()}` || language.noInfo}
            label={language.price}
            isPrice={!!selectedRecord.price?.trim()}
          />
        </div>
        <LayoutElement
          className="details-footer"
          ariaLabel={language.albumDetails}
        >
          <DetailLink to={`/update/${recordId}${location.search}`}>
            {language.updateAlbum}
          </DetailLink>

          {recordId && (
            <>
              <Button className="btn-danger" onClick={handleOpenModal}>
                {language.deleteAlbum}
              </Button>
              <DeleteRecordModal
                modalId={recordId}
                primaryActionBtn={primaryActionBtn}
                secondaryActionBtn={secondaryActionBtn}
              />
            </>
          )}
        </LayoutElement>
      </section>
    </article>
  ) : (
    <span>Loading...</span>
  );
};

export default DetailsPage;
