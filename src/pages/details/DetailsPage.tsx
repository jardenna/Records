import { FC } from 'react';
import { Link, useLocation, useNavigate, useParams } from 'react-router';
import { useAppDispatch } from '../../app/hooks';
import Button from '../../components/Button';
import DeleteRecordModal from '../../components/DeleteRecordModal';
import MetaTags from '../../components/MetaTags';
import {
  PrimaryActionBtnProps,
  SecondaryActionBtnProps,
} from '../../components/modal/Modal';
import { labels, noInfo } from '../../components/recordTable/tableHeaders';
import { toggleModal } from '../../features/modalSlice';
import {
  useDeleteRecordMutation,
  useGetRecordByIdQuery,
} from '../../features/records/recordsApiSlice';
import FooterComp from '../../layout/FooterComp';
import HeaderComp from '../../layout/header/HeaderComp';
import { MainPath } from '../../types/enums';
import DetailsContent from './DetailsContent';
import './_details.scss';

const DetailsPage: FC = () => {
  const dispatch = useAppDispatch();
  const location = useLocation();
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
    if (location.search) {
      navigate(`/${MainPath.Records}${location.search}`);
    } else {
      navigate(`/${MainPath.Records}`);
    }
  };

  const primaryActionBtn: PrimaryActionBtnProps = {
    label: 'Slet album',
    onClick: handleDeleteRecord,
  };

  const secondaryActionBtn: SecondaryActionBtnProps = {
    label: 'Annuller',
  };

  return selectedRecord ? (
    <article className="details">
      <MetaTags
        description="This is the records page description"
        keywords="records, music, artists"
        title="Records details"
      />
      <section className="details-img-container">
        <HeaderComp className="details-header" ariaLabel="Record details">
          <h2 className="details-artist">{selectedRecord.artist}</h2>
          <span className="details-title"> / {selectedRecord.title}</span>
        </HeaderComp>
        <img src="/images/default.png" alt="" className="block-img" />
      </section>
      <section className="details-content-container">
        <div>
          <DetailsContent
            text={selectedRecord.origin || noInfo}
            label={labels.origin}
          />
          <DetailsContent
            text={selectedRecord.prodYear}
            label={labels.prodYear}
          />
          <DetailsContent
            text={selectedRecord.released || selectedRecord.prodYear}
            label={labels.released}
          />
          <DetailsContent
            text={selectedRecord.label || noInfo}
            label={labels.label}
          />
          <DetailsContent
            text={selectedRecord.recordNo || noInfo}
            label={labels.recordNo}
          />
          <DetailsContent
            text={selectedRecord.numOfRecords || 1}
            label={labels.numOfRecords}
          />
          <DetailsContent
            text={`${selectedRecord.price}` || noInfo}
            label={labels.price}
            isPrice={!!selectedRecord.price}
          />
        </div>
        <FooterComp className="details-footer" ariaLabel="Record-details">
          <Link
            id={recordId}
            className="btn-primary"
            to={`/update/${recordId}${location.search}`}
          >
            Opdater plade
          </Link>

          {recordId && (
            <>
              <Button className="btn-danger" onClick={handleOpenModal}>
                Slet album
              </Button>
              <DeleteRecordModal
                modalId={recordId}
                primaryActionBtn={primaryActionBtn}
                secondaryActionBtn={secondaryActionBtn}
              />
            </>
          )}
        </FooterComp>
      </section>
    </article>
  ) : (
    <span>Loading...</span>
  );
};
export default DetailsPage;
