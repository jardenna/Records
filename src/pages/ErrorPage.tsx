import { FC } from 'react';
import { isRouteErrorResponse, useNavigate, useRouteError } from 'react-router';
import ErrorContent from '../components/ErrorContent';
import MetaTags from '../components/MetaTags';
import useLanguage from '../features/language/useLanguage';

const ErrorPage: FC = () => {
  const error = useRouteError() as Error;
  const navigate = useNavigate();
  const { language } = useLanguage();

  if (!isRouteErrorResponse(error)) {
    return null;
  }

  const handleGoback = () => {
    navigate(-1);
  };

  return (
    <main className="error-page">
      <MetaTags
        description="This is the records page description"
        keywords="records, music, artists"
        title={language.somethingWentWrong}
      />
      <ErrorContent
        onClick={handleGoback}
        errorText={error.data}
        btnLabel={language.goBack}
      />
    </main>
  );
};

export default ErrorPage;
