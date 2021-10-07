import React from 'react';
import { Button, TextArea } from '@fabric-ds/react';

export default function App() {
  const button = React.createElement(
    Button,
    {
      className: 'mb-10',
      onClick: () => {
        console.log('click handler called');
      },
    },
    'Hi',
  );

  const textArea = React.createElement(TextArea, {
    name: 'my-text',
    defaultValue: 'Stuff here',
    className: 'mb-10',
  });

  return React.createElement('div', { className: 'm-10' }, button, textArea);
}
