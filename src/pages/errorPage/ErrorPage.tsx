import { FC } from 'react';
import { isRouteErrorResponse, useRouteError } from 'react-router';
import MetaTags from '../../components/MetaTags';
import useLanguage from '../../features/language/useLanguage';
import LayoutElement from '../../layout/LayoutElement';
import './_error-page.scss';

const ErrorPage: FC = () => {
  const error = useRouteError() as Error;
  const { language } = useLanguage();

  if (!isRouteErrorResponse(error)) {
    return null;
  }

  const isWrongUrl = error.data.includes('No route matches URL');

  return (
    <main className={`error-page ${isWrongUrl ? 'error-url' : ''}`}>
      <MetaTags
        description="This is the records page description"
        keywords="records, music, artists"
        title={language.error}
      />
      <LayoutElement as="header" ariaLabel={language.error}>
        <img
          className="emoji"
          src="/images/sad_smiley.png"
          alt="Really guilty emoji"
        />

        <h1>ErrorText</h1>
      </LayoutElement>

      <h2>{error.data}</h2>
    </main>
  );
};

export default ErrorPage;
