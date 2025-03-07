import { FC } from 'react';
import { useLocation, useParams } from 'react-router';
import { useAppDispatch } from '../app/hooks';
import Button from '../components/Button';
import DeleteRecordModal from '../components/DeleteRecordModal';
import MetaTags from '../components/MetaTags';
import RecordDetailsList from '../components/RecordDetailsList';
import DetailLink from '../components/shared/DetailLink';
import RecordImg from '../components/shared/recordImg/RecordImg';
import Skeleton from '../components/skeleton/Skeleton';
import SkeletonList from '../components/skeleton/SkeletonList';
import useLanguage from '../features/language/useLanguage';
import { toggleModal } from '../features/modalSlice';
import { useGetRecordByIdQuery } from '../features/records/recordsApiSlice';
import LayoutElement from '../layout/LayoutElement';
import { MainPath } from '../layout/nav/enums';

const DetailsPage: FC = () => {
  const dispatch = useAppDispatch();
  const location = useLocation();
  const { language } = useLanguage();
  const recordParams = useParams();
  const recordId = recordParams.id;

  const {
    data: selectedRecord,
    refetch,
    isLoading,
  } = useGetRecordByIdQuery(recordId);

  const handleOpenModal = () => {
    if (recordId) {
      dispatch(toggleModal(recordId));
    }
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
              <DetailLink
                to={`/${MainPath.Update}/${recordId}${location.search}`}
              >
                {language.updateAlbum}
              </DetailLink>

              {recordId && (
                <>
                  <Button className="btn-danger" onClick={handleOpenModal}>
                    {language.deleteAlbum}
                  </Button>
                  <DeleteRecordModal
                    modalId={recordId}
                    btnLabel={language.deleteAlbum}
                    id={recordId}
                    name={selectedRecord?.artist || null}
                    shouldNavigate
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
