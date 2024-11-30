import { FC } from 'react';
import { isRouteErrorResponse, useRouteError } from 'react-router';
import PageTitle from '../../components/PageTitle';

import './_error-page.scss';

const ErrorPage: FC = () => {
  const error = useRouteError() as Error;

  if (!isRouteErrorResponse(error)) {
    return null;
  }

  const isWrongUrl = error.data.includes('No route matches URL');

  return (
    <main className={`error-page ${isWrongUrl ? 'error-url' : ''}`}>
      <PageTitle title="Error page" />
      <header aria-label="Error page">
        <img
          className="emoji"
          src="/images/sad_smiley.png"
          alt="Really guilty emoji"
        />

        <h1>ErrorText</h1>
      </header>

      <h2>{error.data}</h2>
    </main>
  );
};

export default ErrorPage;
