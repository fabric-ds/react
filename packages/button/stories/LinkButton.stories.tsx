import * as React from 'react';
import { LinkButton } from '../src';

const metadata = { title: 'Buttons/LinkButton' };
export default metadata;

export const Example = () => {
    return (
        <>
            <LinkButton className="mr-32">Button test</LinkButton>
            <LinkButton small>Button test</LinkButton>
        </>
    );
};
