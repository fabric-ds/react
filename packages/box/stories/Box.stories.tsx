import * as React from 'react';
import { Box } from '../src';

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

export const Clickable = () => (
    <Box info clickable onClick={() => alert(`You clicked me!`)}>
        <h1>Hover over me, i'm clickable</h1>
    </Box>
);

export const As = () => (
    <Box as="section">
        <h1>I'm wrapped in a section tag</h1>
    </Box>
);
