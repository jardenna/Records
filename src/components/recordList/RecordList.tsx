import { FC } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { Records } from '../../app/api/apiTypes';
import useLanguage from '../../features/language/useLanguage';
import LayoutElement from '../../layout/LayoutElement';
import { MainPath } from '../../layout/nav/enums';
import { BtnVariant } from '../../types/enums';
import ErrorBoundaryFallback from '../ErrorBoundaryFallback';
import DetailLink from '../shared/DetailLink';
import RecordImg from '../shared/recordImg/RecordImg';
import './_record-list.scss';

interface RecordListProps {
  records?: Records[];
  refetch: () => void;
}

const RecordList: FC<RecordListProps> = ({ records, refetch }) => {
  const { language } = useLanguage();

  return (
    <ul className="record-list grid three-col">
      {records &&
        records.map((record) => (
          <li className="record-item" key={record.id}>
            <ErrorBoundary
              FallbackComponent={ErrorBoundaryFallback}
              onReset={() => {
                refetch();
              }}
            >
              <article>
                <RecordImg
                  src={record.cover !== '' ? record.cover : ''}
                  title={record.artist}
                  Subtitle={record.title}
                  onReset={() => {
                    refetch();
                  }}
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
              </article>
            </ErrorBoundary>
          </li>
        ))}
    </ul>
  );
};

export default RecordList;
