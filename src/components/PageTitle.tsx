import { FC, useEffect } from 'react';
import { useLocation } from 'react-router';

interface PageTitleProps {
  title: string;
}

const PageTitle: FC<PageTitleProps> = ({ title }) => {
  const location = useLocation();

  useEffect(() => {
    document.title = `A11y | ${title}`;
  }, [location, title]);

  return null;
};

export default PageTitle;
