import React from 'react';
import { Button } from '../../button/src';
import { Alert } from '../src';

const metadata = { title: 'FeedbackIndicators/Alert' };
export default metadata;

export const Default = () => {
  return (
    <div className="flex flex-col gap-y-16">
      <div>
        <h3>Negative</h3>
        <Alert type="negative">
          This is a message that you've done something really wrong.
        </Alert>
      </div>
      <div>
        <h3>Positive</h3>
        <Alert type="positive">
          This is a message that gives you positive feedback.
        </Alert>
      </div>
      <div>
        <h3>Warning</h3>
        <Alert type="warning">
          This is a message that shows a warning, might be nothing serious.
        </Alert>
      </div>
      <div>
        <h3>Info</h3>
        <Alert type="info">
          This is a message that enlightens you with some new cool information.
        </Alert>
      </div>
      <div>
        <h3>Neutral</h3>
        <Alert type="neutral">
          This is the most neutral of neutral messages. Could be used for
          whatever really.
        </Alert>
      </div>
    </div>
  );
};

const InteractiveContent = () => (
  <>
    <p className="font-bold">This text attracts your attention right away</p>
    <p>This is the message text that can be short or a little bit long</p>
    <a>Link to more information</a>
    <div className="mt-8 space-x-8">
      <Button small>Primary CTA</Button>
      <Button small secondary quiet>
        Secondary
      </Button>
    </div>
  </>
);

export const WithInteractiveContent = () => {
  return (
    <div className="flex flex-col gap-y-16">
      <div>
        <h3>Negative</h3>
        <Alert type="negative">
          <InteractiveContent />
        </Alert>
      </div>
      <div>
        <h3>Positive</h3>
        <Alert type="positive">
          <InteractiveContent />
        </Alert>
      </div>
      <div>
        <h3>Warning</h3>
        <Alert type="warning">
          <InteractiveContent />
        </Alert>
      </div>
      <div>
        <h3>Info</h3>
        <Alert type="info">
          <InteractiveContent />
        </Alert>
      </div>
      <div>
        <h3>Neutral</h3>
        <Alert type="neutral">
          <InteractiveContent />
        </Alert>
      </div>
    </div>
  );
};
