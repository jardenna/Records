import { FC } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router';
import { useAppDispatch } from '../app/hooks';
import Button from '../components/Button';
import DeleteRecordModal from '../components/DeleteRecordModal';
import MetaTags from '../components/MetaTags';
import {
  PrimaryActionBtnProps,
  SecondaryActionBtnProps,
} from '../components/modal/Modal';
import RecordDetailsList from '../components/RecordDetailsList';
import DetailLink from '../components/shared/DetailLink';
import RecordImg from '../components/shared/recordImg/RecordImg';
import Skeleton from '../components/skeleton/Skeleton';
import SkeletonList from '../components/skeleton/SkeletonList';
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
  const {
    data: selectedRecord,
    refetch,
    isLoading,
  } = useGetRecordByIdQuery(recordId);
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

  return (
    <article
      className="details flex"
      aria-label={isLoading ? 'Loading' : undefined}
    >
      <MetaTags
        description="This is the records page description"
        keywords="records, music, artists"
        title={language.albumDetails}
      />
      {isLoading ? (
        <div>
          <Skeleton variant="img" />
        </div>
      ) : (
        selectedRecord && (
          <RecordImg
            src={selectedRecord.cover}
            alt=""
            title={selectedRecord.artist}
            Subtitle={selectedRecord.title}
            refetch={() => refetch}
          />
        )
      )}
      <section
        className="details-content-container"
        aria-label={isLoading ? 'Loading' : undefined}
      >
        {isLoading ? (
          <>
            <Skeleton count={8} />
            <SkeletonList count={2} width={14} variant="secondary" />
          </>
        ) : (
          <div>
            <RecordDetailsList
              selectedRecord={selectedRecord || null}
              refetch={() => refetch}
            />
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
                    name={selectedRecord?.artist || null}
                  />
                </>
              )}
            </LayoutElement>
          </div>
        )}
      </section>
    </article>
  );
};

export default DetailsPage;
