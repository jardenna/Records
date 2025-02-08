import { FC, ReactNode } from 'react';
import { NavLink } from 'react-router';
import Dropdown from '../../../components/dropdown/Dropdown';
import { PrimaryActionBtnProps } from '../../../components/modal/Modal';
import { BtnVariant } from '../../../types/enums';
import { MainPath } from '../enums';
import './_nav-auth-container.scss';
import { UserRequest } from '../../../app/api/apiTypes';

interface NavAuthContainerProps {
  actionBtn: PrimaryActionBtnProps;
  dropdownContent: string;
  triggerContent: ReactNode;
  user: UserRequest | null;
}

const NavAuthContainer: FC<NavAuthContainerProps> = ({
  user,
  triggerContent,
  actionBtn,
  dropdownContent,
}) => (
  <div className="flex-1 nav-auth-container">
    {!user ? (
      <NavLink to={MainPath.Login} className="nav-item">
        {triggerContent}
      </NavLink>
    ) : (
      <Dropdown
        btnVariant={BtnVariant.Ghost}
        actionBtn={actionBtn}
        triggerContent={triggerContent}
      >
        <p>{dropdownContent}</p>
      </Dropdown>
    )}
  </div>
);

export default NavAuthContainer;
