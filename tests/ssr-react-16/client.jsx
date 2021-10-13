import React from 'react';
import ReactDom from 'react-dom';
import App from './index.jsx';

ReactDom.hydrate(<App />, document.getElementById('app'));
