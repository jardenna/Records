import { FC } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import useLanguage from '../../features/language/useLanguage';
import LayoutElement from '../../layout/LayoutElement';
import { BtnVariant, MainPath } from '../../types/enums';
import ErrorBoundaryFallback from '../errorBoundary/ErrorBoundaryFallback';
import DetailLink from '../shared/DetailLink';
import RecordImg from '../shared/recordImg/RecordImg';
import './_record-list.scss';

interface RecordListProps {
  refetch: () => void;
  records?: any;
}

const RecordList: FC<RecordListProps> = ({ records, refetch }) => {
  const { language } = useLanguage();

  return (
    <ul className="record-list grid three-col">
      {records &&
        records.map((record: any) => (
          <li className="record-item" key={record.id}>
            <ErrorBoundary
              FallbackComponent={ErrorBoundaryFallback}
              onReset={() => refetch}
            >
              <RecordImg
                src={record.cover !== '' ? record.cover : ''}
                title={record.artist}
                Subtitle={record.title}
                refetch={() => refetch}
                alt=""
              />
              <LayoutElement
                ariaLabel={language.albumInfo}
                className="record-img-footer"
              >
                <DetailLink
                  btnVariant={BtnVariant.Secondary}
                  to={`/${MainPath.Details}/${record.id}`}
                >
                  {language.details}
                </DetailLink>
              </LayoutElement>
            </ErrorBoundary>
          </li>
        ))}
    </ul>
  );
};

export default RecordList;
