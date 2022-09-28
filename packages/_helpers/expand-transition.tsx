import React, { PropsWithChildren, useEffect, useRef, useState } from 'react';
import { collapse, expand } from 'element-collapse';

export function ExpandTransition({
  show,
  children,
}: PropsWithChildren<{ show?: Boolean }>) {
  const [removeElement, setRemoveElement] = useState(!show);
  const expandableRef = useRef<HTMLDivElement>(null);
  const isMounted = useRef(false);

  function collapseElement(el: HTMLElement) {
    collapse(el, () => setRemoveElement(true));
  }

  function expandElement(el: HTMLElement) {
    expand(el);
  }

  if (show && removeElement) {
    setRemoveElement(false);
  }

  useEffect(() => {
    // Don't do anything at first render
    if (!isMounted.current) {
      isMounted.current = true;
      return;
    }

    if (!expandableRef.current) return;

    if (show) {
      expandElement(expandableRef.current);
    } else {
      collapseElement(expandableRef.current);
    }
  }, [show]);

  return (
    <div ref={expandableRef} aria-hidden={!show ? true : undefined}>
      {removeElement ? null : children}
    </div>
  );
}
