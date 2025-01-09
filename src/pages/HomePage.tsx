import { FC } from 'react';
import DetailLink from '../components/details/DetailLink';
import RecordImgContainer from '../components/shared/recordImgContainer/RecordImgContainer';
import useLanguage from '../features/language/useLanguage';
import { useGetFirstSixRecordsQuery } from '../features/records/recordsApiSlice';
import LayoutElement from '../layout/LayoutElement';
import { MainPath } from '../types/enums';

const HomePage: FC = () => {
  const { language } = useLanguage();
  const { data: records } = useGetFirstSixRecordsQuery();

  return (
    <section className="block-container">
      {records?.results &&
        records?.results.map((six: any) => (
          <div className="block-item" key={six.id}>
            <RecordImgContainer
              src="/images/default.png"
              artist={six.artist}
              title={six.title}
            />
            <LayoutElement ariaLabel={language.albumInfo}>
              <DetailLink to={`/${MainPath.Details}/${six.id}`}>
                {language.details}
              </DetailLink>
            </LayoutElement>
          </div>
        ))}
    </section>
  );
};

export default HomePage;
