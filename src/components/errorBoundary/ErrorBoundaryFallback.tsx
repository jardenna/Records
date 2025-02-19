import { FC } from 'react';
import { IconName } from '../../components/icons/Icon';
import useLanguage from '../../features/language/useLanguage';
import LayoutElement from '../../layout/LayoutElement';
import IconBtn from '../iconBtn/IconBtn';
import MetaTags from '../MetaTags';
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
    <>
      <MetaTags
        description="This is the records page description"
        keywords="records, music, artists"
        title={`${language.somethingWentWrong} ${error.message}`}
      />

      <section className="error-boundary">
        <div>
          <img
            className="emoji"
            src="/images/sad_smiley.png"
            alt="Really guilty emoji"
            loading="lazy"
          />
          <div className="flex">
            <LayoutElement as="header" ariaLabel={language.error}>
              <h3 className="error-boundary-info">
                UPS {language.somethingWentWrong}
              </h3>
              <p className="error-boundary-info">{error.message}</p>
            </LayoutElement>
            <IconBtn
              iconName={IconName.Undo}
              title={language.retry}
              ariaLabel={language.retry}
              onClick={resetErrorBoundary}
            />
          </div>
        </div>
      </section>
    </>
  );
};

export default ErrorBoundaryFallback;
