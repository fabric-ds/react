import React from 'react';
import GettingStarted from './getting-started.mdx';

export default function Index() {
  return (
    <>
      <div className="grid lg:grid-cols-3 gap-16">
        <div className="lg:col-span-2 overflow-hidden">
          <GettingStarted />
        </div>
        <div>
          <f-docs-highlight-box></f-docs-highlight-box>
        </div>
      </div>
    </>
  );
}
