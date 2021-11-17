import React from 'react';
import { Pill } from '../src';
import { IconSearch16, IconPlus16 } from '@fabric-ds/icons/react';

const metadata = { title: 'Buttons/Pill' };
export default metadata;

export const Default = () => {
  return <Pill label="Example" />;
};

export const DefaultCanClose = () => {
  return <Pill label="Example" canClose onClose={() => alert('remove')} />;
};

export const Suggestion = () => {
  return <Pill label="Example" suggestion />;
};

export const SuggestionCanClose = () => {
  return (
    <Pill label="Example" suggestion canClose onClose={() => alert('remove')} />
  );
};

export const PillOnClickAndOnClose = () => {
  return (
    <Pill
      label="Example"
      onClick={() => alert('pill is clicked')}
      suggestion
      canClose
      onClose={() => alert('close is clicked')}
    />
  );
};

export const PillsWithIcon = () => {
  return (
    <div className="flex space-x-8">
      <Pill
        icon={<IconSearch16 />}
        onClick={() => alert('onClick event')}
        className="py-12"
      />
      <Pill
        icon={<IconPlus16 />}
        onClick={() => alert('onClick event')}
        suggestion
        className="py-12"
      />
    </div>
  );
};
