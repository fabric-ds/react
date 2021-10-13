import React from 'react';
import ReactDom from 'react-dom';
import App from './index';

ReactDom.hydrate(<App />, document.getElementById('app'));
