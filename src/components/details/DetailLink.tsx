import { FC, ReactNode } from 'react';
import { Link } from 'react-router';
import { BtnVariant } from '../../types/enums';

interface DetailLinkProps {
  children: ReactNode;
  to: string;
  btnVariant?: BtnVariant;
}

const DetailLink: FC<DetailLinkProps> = ({
  children,

  btnVariant = BtnVariant.Primary,
  to,
}) => (
  <Link className={`btn btn-${btnVariant}`} to={to}>
    {children}
  </Link>
);

export default DetailLink;
