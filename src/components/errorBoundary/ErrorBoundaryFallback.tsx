import { FC } from 'react';
import Icon, { IconName } from '../../components/icons/Icon';

import useLanguage from '../../features/language/useLanguage';
import IconBtn from '../IconBtn';
import MetaTags from '../MetaTags';
import './_error-boundary.scss';

export interface FallbackProps {
  error: Error;
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
        title={`${language.somethingWentWrong} ${error.message}`}
      />

      <section className="error-boundary">
        <p className="error-boundary-info">
          <span className="error-boundary-icon">
            <Icon
              iconName={IconName.Warning}
              title={language.error}
              ariaHidden
            />
          </span>
          {language.somethingWentWrong} {error.message}.
        </p>
        <IconBtn
          iconName={IconName.Undo}
          title={language.retry}
          onClick={resetErrorBoundary}
        />
        {/* <Button
          type="button"
          onClick={resetErrorBoundary}
          variant={BtnVariant.Secondary}
        >
          <Icon
            iconName={IconName.Undo}
            title={language.refresh}
            ariaHidden
            size="16"
          />
          {language.refresh}
        </Button> */}
      </section>
    </>
  );
};

export default ErrorBoundaryFallback;
