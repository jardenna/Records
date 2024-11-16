import { FC, ReactNode, useLayoutEffect, useState } from 'react';
import { createPortal } from 'react-dom';

function createWrapperAndAppendToBody(portalId: string) {
  const wrapperElement = document.createElement('div');
  wrapperElement.setAttribute('id', portalId);
  document.body.append(wrapperElement);

  return wrapperElement;
}

interface PortalProps {
  children: ReactNode;
  portalId: string;
}
const Portal: FC<PortalProps> = ({
  children,
  portalId = 'react-portal-wrapper',
}) => {
  const [wrapperElement, setWrapperElement] = useState<HTMLElement | null>(
    null,
  );

  useLayoutEffect(() => {
    let element: HTMLElement | null = document.getElementById(portalId);
    let systemCreated = false;
    // if element is not found with portalId or portalId is not provided,
    // create and append to body
    if (!element) {
      systemCreated = true;
      element = createWrapperAndAppendToBody(portalId);
    }
    setWrapperElement(element);

    return () => {
      // delete the programmatically created element
      if (systemCreated && element && element.parentNode) {
        element.parentNode.removeChild(element);
      }
    };
  }, [portalId]);

  // wrapperElement state will be null on very first render.
  if (wrapperElement === null) {
    return null;
  }

  return createPortal(children, wrapperElement);
};

export default Portal;
