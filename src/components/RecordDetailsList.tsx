import { FC } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { Records } from '../app/api/apiTypes';
import useLanguage from '../features/language/useLanguage';
import DetailsContent from './details/DetailsContent';
import ErrorBoundaryFallback from './errorBoundary/ErrorBoundaryFallback';

interface RecordDetailsListProps {
  refetch: () => void;
  selectedRecord: Records;
}

const RecordDetailsList: FC<RecordDetailsListProps> = ({
  selectedRecord,
  refetch,
}) => {
  const { language } = useLanguage();

  return (
    <ErrorBoundary
      FallbackComponent={ErrorBoundaryFallback}
      onReset={() => refetch}
    >
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
    </ErrorBoundary>
  );
};

export default RecordDetailsList;
