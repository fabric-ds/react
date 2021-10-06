import * as React from 'react';

// injects the separator between every element in the list
// interleave function from https://stackoverflow.com/a/55387306/966362
export function interleave(array): React.ReactNode[] {
  return []
    .concat(...array.map((crumb, i) => [crumb, <Separator key={i} />]))
    .slice(0, -1);
}

export function Separator() {
  return (
    <span aria-hidden className="select-none">
      /
    </span>
  );
}
