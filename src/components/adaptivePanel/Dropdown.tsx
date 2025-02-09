import { FC, ReactNode } from 'react';
import Button from '../Button';

interface DropdownProps {
  btnLabel: string;
  children: ReactNode;
  id: string;
  ref: React.Ref<HTMLDivElement>;
  handleCallback?: () => void;
}

const Dropdown: FC<DropdownProps> = ({
  children,
  btnLabel,
  handleCallback,
  id,
  ref = null,
}) => (
  <section className="dropdown" ref={ref} id={id}>
    {children}
    <Button onClick={handleCallback}>{btnLabel}</Button>
  </section>
);

export default Dropdown;
