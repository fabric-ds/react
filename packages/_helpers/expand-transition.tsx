import React, { PropsWithChildren, useEffect, useRef, useState } from 'react';
import { collapse, expand } from 'element-collapse';
import { classNames } from '@chbphone55/classnames';

export function ExpandTransition({
  show,
  children,
}: PropsWithChildren<{ show?: Boolean }>) {
  const [isExpanded, setIsExpanded] = useState(show);
  const expandableRef = useRef<HTMLDivElement>(null);
  const isMounted = useRef(false);

  async function collapseElement(el: HTMLElement) {
    await new Promise((resolve) => {
      collapse(el, resolve);
    });
    setIsExpanded(false);
  }

  function expandElement(el: HTMLElement) {
    expand(el);
    setIsExpanded(true);
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
    <div
      ref={expandableRef}
      className={classNames({
        'overflow-hidden': true,
        'h-0 invisible': !isExpanded,
      })}
      aria-hidden={!isExpanded}
    >
      {children}
    </div>
  );
}
