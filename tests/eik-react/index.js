import React from 'https://assets.finn.no/npm/@pika/react/v16/index.js';
import ReactDom from 'https://assets.finn.no/npm/@pika/react-dom/v16/index.js';
import {
  Button,
  TextArea,
} from 'https://assets.finn.no/pkg/@fabric-ds/react/v0/index.js';

function App() {
  const button = React.createElement(Button, { className: 'mb-10' }, 'Hi');

  const textArea = React.createElement(TextArea, {
    name: 'my-text',
    defaultValue: 'Stuff here',
    className: 'mb-10',
  });

  return React.createElement('div', { className: 'm-10' }, button, textArea);
}
ReactDom.render(React.createElement(App, null), document.getElementById('app'));
