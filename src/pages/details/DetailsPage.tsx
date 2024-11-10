import { FC } from 'react';
import { useParams } from 'react-router-dom';
import Button from '../../components/Button';
import { labels, noInfo } from '../../components/recordTable/tableHeaders';
import { useGetRecordByIdQuery } from '../../features/records/recordsApiSlice';
import DetailsContent from './DetailsContent';
import './_details.scss';

const DetailsPage: FC = () => {
  const { id } = useParams();
  const { data: selectedRecord } = useGetRecordByIdQuery(id);

  return selectedRecord ? (
    <article className="details">
      <section className="details-img-container">
        <header className="details-header" aria-label="Record details">
          <h2 className="details-artist">{selectedRecord.artist}</h2>
          <span className="details-title"> / {selectedRecord.title}</span>
        </header>
        <img src="/images/default.png" alt="" className="block-img" />
      </section>
      <section>
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
        <div className="flex">
          <Button>Opdater plade info</Button>
          <Button>Slet plade</Button>
        </div>
      </section>
    </article>
  ) : (
    <span>Loading...</span>
  );
};
export default DetailsPage;
