import { FC } from 'react';
import { useParams } from 'react-router';
import Button from '../../components/Button';
import { labels, noInfo } from '../../components/recordTable/tableHeaders';
import { useGetRecordByIdQuery } from '../../features/records/recordsApiSlice';
import FooterComp from '../../layout/FooterComp';
import HeaderComp from '../../layout/header/HeaderComp';
import DeleteRecordBtn from './DeleteRecordBtn';
import DetailsContent from './DetailsContent';
import './_details.scss';

const DetailsPage: FC = () => {
  const recordId = useParams().id;
  const { data: selectedRecord } = useGetRecordByIdQuery(recordId);

  return selectedRecord ? (
    <article className="details">
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
            text={1 || selectedRecord.numOfRecords}
            label={labels.numOfRecords}
          />

          <DetailsContent
            text={`${selectedRecord.price},00` || noInfo}
            label={labels.price}
          />
        </div>
        <FooterComp className="details-footer" ariaLabel="Record-details">
          <Button>Opdater plade</Button>
          {recordId && (
            <DeleteRecordBtn modalId={recordId} btnText="Slet pladde" />
          )}
        </FooterComp>
      </section>
    </article>
  ) : (
    <span>Loading...</span>
  );
};
export default DetailsPage;
