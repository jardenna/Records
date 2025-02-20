import { FC, ReactNode } from 'react';
import { NavLink } from 'react-router';
import { UserRequest } from '../../../app/api/apiTypes';
import AdaptivePanel from '../../../components/adaptivePanel/AdaptivePanel';
import { BtnVariant } from '../../../types/enums';
import { MainPath } from '../enums';
import './_nav-auth-container.scss';
import { ActionBtnProps } from '../Nav';

interface NavAuthContainerProps {
  actionBtn: ActionBtnProps;
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
  <section className="nav-auth-container">
    {!user ? (
      <NavLink to={MainPath.Login} className="nav-item">
        {triggerContent}
      </NavLink>
    ) : (
      <AdaptivePanel
        btnVariant={BtnVariant.Ghost}
        actionBtn={actionBtn}
        triggerContent={triggerContent}
      >
        <p>{dropdownContent}</p>
      </AdaptivePanel>
    )}
  </section>
);

export default NavAuthContainer;
