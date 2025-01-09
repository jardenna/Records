import { FC } from 'react';
import DetailLink from '../components/details/DetailLink';
import RecordImgContainer from '../components/shared/RecordImgContainer';
import useLanguage from '../features/language/useLanguage';
import { useGetFirstSixRecordsQuery } from '../features/records/recordsApiSlice';
import LayoutElement from '../layout/LayoutElement';

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
              <DetailLink recordId={six.id}>{language.details}</DetailLink>
            </LayoutElement>
          </div>
        ))}
    </section>
  );
};
export default HomePage;
