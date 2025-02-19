import { FC } from 'react';
import useLanguage from '../features/language/useLanguage';
import LayoutElement from '../layout/LayoutElement';
import { BtnVariant } from '../types/enums';
import Button from './Button';
import MetaTags from './MetaTags';

interface ErrorContentProps {
  btnLabel: string;
  errorText: string;
  onClick: () => void;
  className?: string;
}

const ErrorContent: FC<ErrorContentProps> = ({
  onClick,
  errorText,
  btnLabel,
  className = '',
}) => {
  const { language } = useLanguage();
  return (
    <section className={`error ${className}`}>
      <MetaTags
        description="This is the records page description"
        keywords="records, music, artists"
        title={`${language.somethingWentWrong}`}
      />
      <img
        className="emoji"
        src="/images/sad_smiley.png"
        alt={language.errorAltText}
        loading="lazy"
      />

      <LayoutElement as="header" ariaLabel={language.error}>
        <h2 className="error-info">{errorText}</h2>
      </LayoutElement>

      <Button onClick={onClick} variant={BtnVariant.Secondary}>
        {btnLabel}
      </Button>
    </section>
  );
};

export default ErrorContent;
