import { IconBag16 } from '@fabric-ds/icons/react';
import * as React from 'react';
import { Expandable } from '../src';

const metadata = { title: 'Layout/Expandable' };
export default metadata;

export const Default = () => (
  <Expandable title="This is a title">
    <h1>I am expandable</h1>
  </Expandable>
);

export const Box = () => (
  <Expandable title="This is a title" box>
    <h1>I am expandable</h1>
  </Expandable>
);

export const BoxWithCustomTitle = () => (
  <Expandable
    title={
      <div className="flex flex-row items-center">
        <IconBag16 />
        <p className="ml-8 mb-0">This is a title with an icon</p>
      </div>
    }
    box
    info
  >
    <h1>I am expandable</h1>
  </Expandable>
);

export const InfoBox = () => (
  <Expandable title="This is a title" box info>
    <h1>I am expandable</h1>
  </Expandable>
);

export const RedBox = () => (
  <Expandable title="This is a title" box className="bg-red-50">
    <h1>I am expandable</h1>
  </Expandable>
);

export const GreenButton = () => (
  <Expandable
    title="This is a title"
    box
    className="bg-green-50"
    buttonClass="hover:text-green-700"
  >
    <h1>I am expandable</h1>
  </Expandable>
);

export const Controlled = () => {
  const [open, setOpen] = React.useState(false);
  return (
    <Expandable title={open ? 'Open' : 'Closed'} box info onChange={setOpen}>
      <h1>I am expandable</h1>
    </Expandable>
  );
};

export const NoChevron = () => {
  const [open, setOpen] = React.useState(false);
  return (
    <Expandable
      title={open ? 'Open' : 'Closed'}
      box
      info
      chevron={false}
      onChange={setOpen}
    >
      <h1>I am expandable</h1>
    </Expandable>
  );
};

export const Animated = () => {
  return (
    <Expandable title="Animated box" box info animated>
      <h1>I am expandable</h1>
    </Expandable>
  );
};

export const AnimatedExpanded = () => {
  return (
    <Expandable title="Animated box" expanded box info animated>
      <h1>I am expandable</h1>
    </Expandable>
  );
};

export const Heading = () => {
  return (
    <Expandable title="I'm also a heading" headingLevel={1}>
      <h1>I am expandable</h1>
    </Expandable>
  );
};
