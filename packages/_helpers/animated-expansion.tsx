import React, { PropsWithChildren, useEffect, useRef, useState } from 'react';
import { collapse, expand } from 'element-collapse';
import { classNames } from '@chbphone55/classnames';

export function AnimatedExpansion({
  show,
  children,
}: PropsWithChildren<{ show?: Boolean }>) {
  const [isExpanded, setIsExpanded] = useState(show);
  const expandableRef = useRef(null);
  const isMounted = useRef(false);

  async function collapseElement() {
    await new Promise((resolve) => {
      collapse(expandableRef.current, resolve);
    });
    setIsExpanded(false);
  }

  function expandElement() {
    expand(expandableRef.current);
    setIsExpanded(true);
  }

  useEffect(() => {
    // Don't do anything at first render
    if (!isMounted.current) {
      isMounted.current = true;
      return;
    }

    if (show) {
      expandElement();
    } else {
      collapseElement();
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
