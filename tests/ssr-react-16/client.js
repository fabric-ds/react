import React from 'react';
import ReactDom from 'react-dom';
import app from './index.js';

ReactDom.hydrate(React.createElement(app), document.getElementById('app'));
