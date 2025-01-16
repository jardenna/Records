/* eslint-disable react/button-has-type */

import { FC, ReactNode } from 'react';
import { BtnVariant } from '../types/enums';
import { BtnType, ButtonEventType } from '../types/types';
import VisuallyHidden from './VisuallyHidden';
import Loader from './loader/Loader';

interface ButtonProps {
  children: ReactNode;
  ariaControls?: string;
  ariaDescribedby?: string;
  ariaExpanded?: boolean;
  ariaLabel?: string;
  ariaSelected?: boolean;
  autoFocus?: boolean;
  className?: string;
  disabled?: boolean;
  id?: string;
  isBtnSelected?: boolean;
  isLoading?: boolean;
  name?: string;
  onClick?: (event?: ButtonEventType) => void;
  ref?: (el: HTMLButtonElement | null) => void;
  role?: string;
  tabIndex?: 0 | -1;
  type?: BtnType;
  variant?: BtnVariant;
}

const Button: FC<ButtonProps> = ({
  children,
  type = 'button',
  id,
  tabIndex,
  variant = 'primary',
  onClick,
  ref,
  ariaSelected,
  ariaExpanded,
  ariaControls,
  ariaLabel,
  isBtnSelected,
  role,
  className = '',
  autoFocus,
  disabled,
  name,
  ariaDescribedby,
  isLoading,
}) => (
  <button
    id={id}
    tabIndex={tabIndex}
    role={role}
    type={type}
    ref={ref}
    onClick={onClick}
    aria-selected={ariaSelected}
    aria-expanded={ariaExpanded}
    aria-controls={ariaControls}
    autoFocus={autoFocus}
    aria-disabled={disabled || isLoading || undefined}
    className={`btn btn-${variant} ${className}`}
    disabled={disabled || isLoading}
    name={name}
    aria-describedby={isBtnSelected ? ariaDescribedby : undefined}
  >
    {ariaLabel && <VisuallyHidden>{ariaLabel}</VisuallyHidden>}
    {!isLoading ? (
      children
    ) : (
      <span aria-hidden>
        <Loader />
      </span>
    )}
  </button>
);

export default Button;
