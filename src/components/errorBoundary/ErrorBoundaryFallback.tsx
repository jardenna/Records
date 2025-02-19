import { FC } from 'react';
import useLanguage from '../../features/language/useLanguage';
import ErrorContent from '../ErrorContent';
import './_error-boundary.scss';

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
    <ErrorContent
      onClick={resetErrorBoundary}
      errorText={error.message}
      btnLabel={language.retry}
    />
  );
};

export default ErrorBoundaryFallback;
