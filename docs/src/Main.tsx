import * as React from 'react';
import { render } from 'react-dom';
import { MDXProvider } from '@mdx-js/react';
import {
  BrowserRouter as Router,
  Switch as ReactSwitch,
  Route,
} from 'react-router-dom';

import Code from './components/Code';
import PropTable from './components/PropTable';

import Home from '../pages/index.mdx';
import GettingStarted from '../pages/getting-started.mdx';
import Modal from '../../packages/modal/docs/Modal.mdx';
import Breadcrumbs from '../../packages/breadcrumbs/docs/Breadcrumbs.mdx';

import Tabs from '../../packages/tabs/docs/Tabs.mdx';
import TextField from '../../packages/textfield/docs/TextField.mdx';
import Select from '../../packages/select/docs/Select.mdx';
import TextArea from '../../packages/textarea/docs/TextArea.mdx';
import Combobox from '../../packages/combobox/docs/Combobox.mdx';
import Button from '../../packages/button/docs/Button.mdx';
import Slider from '../../packages/slider/docs/Slider.mdx';
import Box from '../../packages/box/docs/Box.mdx';
import Expandable from '../../packages/expandable/docs/Expandable.mdx';
import Switch from '../../packages/switch/docs/Switch.mdx';
import Toggle from '../../packages/toggle/docs/Toggle.mdx';
import Steps from '../../packages/steps/docs/Steps.mdx';
import Card from '../../packages/card/docs/Card.mdx';

const components = {
  code: Code,
  PropTable,
  pre: (props) => <div {...props} />,
  img: ({ style, ...props }) => (
    // eslint-disable-next-line jsx-a11y/alt-text
    <img {...props} style={{ maxWidth: '100%', ...style }} />
  ),
  h1: (props) => <h1 className="mb-20" {...props} />,
  h2: (props) => <h2 className="mt-48 mb-20" {...props} />,
  h3: (props) => <h3 className="mt-20 mb-20" {...props} />,
};

const App = () => {
  return (
    <MDXProvider components={components}>
      <Router>
        <ReactSwitch>
          <Route path="/react/" exact>
            <Home />
          </Route>
          <Route path="/react/getting-started">
            <GettingStarted />
          </Route>

          <Route path="/react/modal">
            <Modal />
          </Route>

          <Route path="/react/breadcrumbs">
            <Breadcrumbs />
          </Route>

          <Route path="/react/textfield">
            <TextField />
          </Route>

          <Route path="/react/select">
            <Select />
          </Route>

          <Route path="/react/tabs">
            <Tabs />
          </Route>

          <Route path="/react/textarea">
            <TextArea />
          </Route>

          <Route path="/react/slider">
            <Slider />
          </Route>

          <Route path="/react/combobox">
            <Combobox />
          </Route>

          <Route path="/react/button">
            <Button />
          </Route>

          <Route path="/react/box">
            <Box />
          </Route>

          <Route path="/react/expandable">
            <Expandable />
          </Route>

          <Route path="/react/switch">
            <Switch />
          </Route>

          <Route path="/react/toggle">
            <Toggle />
          </Route>

          <Route path="/react/steps">
            <Steps />
          </Route>

          <Route path="/react/Card">
            <Card />
          </Route>
        </ReactSwitch>
      </Router>
    </MDXProvider>
  );
};

render(App(), document.querySelector('#root'));
