import { MDXProvider } from '@mdx-js/react';
import React from 'react';
import { render } from 'react-dom';
import {
  BrowserRouter as Router,
  Route,
  Switch as ReactSwitch,
} from 'react-router-dom';
import Alert from '../../packages/alert/docs/Alert.mdx';
import Box from '../../packages/box/docs/Box.mdx';
import Breadcrumbs from '../../packages/breadcrumbs/docs/Breadcrumbs.mdx';
import Button from '../../packages/button/docs/Button.mdx';
import Pill from '../../packages/pill/docs/Pill.mdx';
import Card from '../../packages/card/docs/Card.mdx';
import Combobox from '../../packages/combobox/docs/Combobox.mdx';
import Expandable from '../../packages/expandable/docs/Expandable.mdx';
import Modal from '../../packages/modal/docs/Modal.mdx';
import Select from '../../packages/select/docs/Select.mdx';
import Slider from '../../packages/slider/docs/Slider.mdx';
import Steps from '../../packages/steps/docs/Steps.mdx';
import Switch from '../../packages/switch/docs/Switch.mdx';
import Tabs from '../../packages/tabs/docs/Tabs.mdx';
import TextArea from '../../packages/textarea/docs/TextArea.mdx';
import TextField from '../../packages/textfield/docs/TextField.mdx';
import Toggle from '../../packages/toggle/docs/Toggle.mdx';
import Attention from '../../packages/attention/docs/Attention.mdx';
import Home from '../pages/index.jsx';
import Code from './components/Code';
import PropTable from './components/PropTable';

const components = {
  code: Code,
  PropTable,
  pre: (props) => <div {...props} />,
  img: ({ style, ...props }) => (
    // eslint-disable-next-line jsx-a11y/alt-text
    <img {...props} style={{ maxWidth: '100%', ...style }} />
  ),
};

const App = () => {
  return (
    <MDXProvider components={components}>
      <Router>
        <ReactSwitch>
          <Route path="/" exact>
            <Home />
          </Route>

          <Route path="/alert">
            <Alert />
          </Route>

          <Route path="/modal">
            <Modal />
          </Route>

          <Route path="/breadcrumbs">
            <Breadcrumbs />
          </Route>

          <Route path="/attention">
            <Attention />
          </Route>

          <Route path="/textfield">
            <TextField />
          </Route>

          <Route path="/select">
            <Select />
          </Route>

          <Route path="/tabs">
            <Tabs />
          </Route>

          <Route path="/textarea">
            <TextArea />
          </Route>

          <Route path="/slider">
            <Slider />
          </Route>

          <Route path="/combobox">
            <Combobox />
          </Route>

          <Route path="/button">
            <Button />
          </Route>

          <Route path="/pill">
            <Pill />
          </Route>

          <Route path="/box">
            <Box />
          </Route>

          <Route path="/expandable">
            <Expandable />
          </Route>

          <Route path="/switch">
            <Switch />
          </Route>

          <Route path="/toggle">
            <Toggle />
          </Route>

          <Route path="/steps">
            <Steps />
          </Route>

          <Route path="/Card">
            <Card />
          </Route>
        </ReactSwitch>
      </Router>
    </MDXProvider>
  );
};

render(App(), document.querySelector('#root'));
