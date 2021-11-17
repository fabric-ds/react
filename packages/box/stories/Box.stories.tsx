import React from 'react';
import { Box } from '../src';
import { Clickable } from '../../_helpers';

const metadata = { title: 'Layout/Box' };
export default metadata;

export const Default = () => (
  <Box>
    <h1>I have default styles</h1>
  </Box>
);

export const Info = () => (
  <Box info>
    <h1>I have info styles</h1>
  </Box>
);

export const Bleed = () => (
  <Box bleed>
    <h1>I am full width on mobile</h1>
  </Box>
);

export const Bordered = () => (
  <Box bordered>
    <h1>I am bordered with no fill</h1>
  </Box>
);

export const Neutral = () => (
  <Box neutral>
    <h1>I am a neutral colour</h1>
  </Box>
);

export const ClickableButton = () => (
  <Box info clickable>
    <h1>
      <Clickable className="font-bold" onClick={() => alert('hey')}>
        Clickable example
      </Clickable>
    </h1>
    <p>Other contents will go here.</p>
  </Box>
);

export const ClickableAnchor = () => (
  <Box info clickable>
    <h1>
      <Clickable
        className="font-bold text-gray-700 hover:no-underline"
        href="https://finn.no"
        target="_blank"
      >
        Clickable example
      </Clickable>
    </h1>
    <p>Other contents will go here.</p>
  </Box>
);

export const As = () => (
  <Box as="section">
    <h1>I'm wrapped in a section tag</h1>
  </Box>
);
