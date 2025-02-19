import { FC } from 'react';
import { isRouteErrorResponse, useNavigate, useRouteError } from 'react-router';
import ErrorContent from '../../components/ErrorContent';
import useLanguage from '../../features/language/useLanguage';
import './_error-page.scss';

const ErrorPage: FC = () => {
  const error = useRouteError() as Error;
  const navigate = useNavigate();
  const { language } = useLanguage();

  if (!isRouteErrorResponse(error)) {
    return null;
  }

  const isWrongUrl = error.data.includes('No route matches URL');

  const handleGoback = () => {
    navigate(-1);
  };

  return (
    <main className={`error-page ${isWrongUrl ? 'error-url' : ''}`}>
      <ErrorContent
        onClick={handleGoback}
        errorText={error.data}
        btnLabel={language.goBack}
      />
    </main>
  );
};

export default ErrorPage;
