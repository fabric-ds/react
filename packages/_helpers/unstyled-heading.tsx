import React, { PropsWithChildren } from 'react';
import { HeadingLevel } from './props';

export const UnstyledHeading = ({
  headingLevel,
  children,
  ...attrs
}: PropsWithChildren<{
  headingLevel?: HeadingLevel;
}>) => {
  if (!headingLevel) {
    return <React.Fragment>{children}</React.Fragment>;
  }

  // We must tell TypeScript that Heading is a valid HTML tag name
  const Heading = `h${headingLevel}` as keyof JSX.IntrinsicElements;

  return (
    <Heading
      style={{
        margin: 0,
        fontWeight: 'unset',
        fontSize: 'unset',
        lineHeight: 'unset',
      }}
      {...attrs}
    >
      {children}
    </Heading>
  );
};
