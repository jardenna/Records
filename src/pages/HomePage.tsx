import { FC } from 'react';
import Figure from '../components/figure/Figure';
import useLanguage from '../features/language/useLanguage';
import { useGetFirstSixRecordsQuery } from '../features/records/recordsApiSlice';
import DetailLink from './details/DetailLink';

const HomePage: FC = () => {
  const { language } = useLanguage();
  const { data: records } = useGetFirstSixRecordsQuery();

  return (
    <section className="block-container">
      {records?.results &&
        records?.results.map((six: any) => (
          <div className="block-item" key={six.id}>
            <h1>{six.artist}</h1>
            <h2> {six.title}</h2>
            <div className="block-img">
              <Figure src="/images/default.png" alt={six.artist} />
            </div>
            <footer className="index-block-footer">
              <DetailLink recordId={six.id}>{language.details}</DetailLink>
            </footer>
          </div>
        ))}
    </section>
  );
};
export default HomePage;
