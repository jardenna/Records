import { FC } from 'react';
import { Records } from '../../app/api/apiTypes';
import useLanguage from '../../features/language/useLanguage';
import LayoutElement from '../../layout/LayoutElement';
import { BtnVariant, MainPath } from '../../types/enums';
import DetailLink from '../shared/DetailLink';
import RecordImg from '../shared/recordImg/RecordImg';
import './_record-list.scss';

interface RecordListProps {
  records: Records[];
}

const RecordList: FC<RecordListProps> = ({ records }) => {
  const { language } = useLanguage();

  return (
    <ul className="record-list grid three-col">
      {records.map((record) => (
        <li className="record-item" key={record.id}>
          <RecordImg
            src="/images/default.png"
            title={record.artist}
            Subtitle={record.title}
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
        </li>
      ))}
    </ul>
  );
};

export default RecordList;
