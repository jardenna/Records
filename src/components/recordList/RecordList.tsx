import { FC } from 'react';
import { Records } from '../../app/api/apiTypes';
import useLanguage from '../../features/language/useLanguage';
import LayoutElement from '../../layout/LayoutElement';
import { MainPath } from '../../types/enums';
import DetailLink from '../shared/DetailLink';
import RecordImg from '../shared/recordImg/RecordImg';

interface RecordListProps {
  records: Records[];
}

const RecordList: FC<RecordListProps> = ({ records }) => {
  const { language } = useLanguage();

  return records.map((record) => (
    <li className="block-item" key={record.id}>
      <RecordImg
        src="/images/default.png"
        title={record.artist}
        Subtitle={record.title}
        alt=""
      />
      <LayoutElement ariaLabel={language.albumInfo}>
        <DetailLink to={`/${MainPath.Details}/${record.id}`}>
          {language.details}
        </DetailLink>
      </LayoutElement>
    </li>
  ));
};

export default RecordList;
