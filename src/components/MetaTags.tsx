import { FC, useEffect } from 'react';
import { useLocation } from 'react-router';

interface MetaTagsProps {
  description: string;
  keywords?: string;
  title?: string;
}

const MetaTags: FC<MetaTagsProps> = ({ title = '', description, keywords }) => {
  const location = useLocation();

  useEffect(() => {
    document.title = `Records | ${title}`;
  }, [location, title]);

  return (
    <>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
    </>
  );
};

export default MetaTags;
