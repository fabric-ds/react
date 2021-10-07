import React from "https://assets.finn.no/npm/@pika/react/v16/index.js";
import ReactDom from "https://assets.finn.no/npm/@pika/react-dom/v16/index.js";
import { Button, TextArea } from "https://assets.finn.no/pkg/@fabric-ds/react/v0/index.js";

function App() {
  return (
    <div className="m-10">
      <Button className="mb-10">Hi</Button>
      <TextArea name="my-text" defaultValue="Stuff here" className="mb-10" />
    </div>
  );
}

ReactDom.render(<App />, document.getElementById("app"));
