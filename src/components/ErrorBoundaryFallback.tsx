import { FC } from 'react';
import useLanguage from '../features/language/useLanguage';
import ErrorContent from './ErrorContent';
import MetaTags from './MetaTags';

export interface FallbackProps {
  error: any;
  resetErrorBoundary: () => void;
}

const ErrorBoundaryFallback: FC<FallbackProps> = ({
  error,
  resetErrorBoundary,
}) => {
  const { language } = useLanguage();

  return (
    <>
      <MetaTags
        description="This is the records page description"
        keywords="records, music, artists"
        title={`${language.somethingWentWrong}`}
      />
      <ErrorContent
        onClick={resetErrorBoundary}
        errorText={error.message}
        btnLabel={language.retry}
        className="error-boundary"
      />
    </>
  );
};

export default ErrorBoundaryFallback;
