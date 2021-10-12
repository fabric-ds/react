import React from 'react';
import { Button, TextArea } from '@fabric-ds/react';

export default function App() {
  return (
    <div className="m-10">
      <Button
        className="mb-10"
        onClick={() => {
          console.log('click handler called');
        }}
      >
        Hi there
      </Button>
      <TextArea
        name="my-text"
        defaultValue="Stuff here"
        className="mb-10"
      ></TextArea>
    </div>
  );
}
