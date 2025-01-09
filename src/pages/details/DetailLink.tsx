import { FC, ReactNode } from 'react';
import { Link } from 'react-router';
import { BtnVariant, MainPath } from '../../types/enums';

interface DetailLinkProps {
  children: ReactNode;
  recordId: number;
  btnVariant?: BtnVariant;
  params?: string;
}

const DetailLink: FC<DetailLinkProps> = ({
  recordId,
  children,
  params = '',
  btnVariant = BtnVariant.Primary,
}) => (
  <Link
    className={`btn btn-${btnVariant}`}
    // className="btn btn-ghost"
    to={`/${MainPath.Details}/${recordId}${params}`}
  >
    {children}
  </Link>
);

export default DetailLink;
