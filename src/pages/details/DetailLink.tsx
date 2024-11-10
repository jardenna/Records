import { FC } from 'react';
import { Link } from 'react-router-dom';
import { MainPath } from '../../types/enums';

interface DetailLinkProps {
  id: string;
}

const DetailLink: FC<DetailLinkProps> = ({ id }) => (
  <Link className="btn-primary details-btn" to={`/${MainPath.Details}/${id}`}>
    Details
  </Link>
);

export default DetailLink;
