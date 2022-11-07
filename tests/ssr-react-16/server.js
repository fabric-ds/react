import fastify from 'fastify';
import React from 'react';
import fs from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';
import ReactDomServer from 'react-dom/server.js';
import app from './dist/index.js';

const __dirname = dirname(fileURLToPath(import.meta.url));

const server = fastify();

server.get('/client.js', (request, reply) => {
  reply.type('application/javascript');
  return fs.createReadStream(join(__dirname, './dist/client.js'));
});

server.get('/', (request, reply) => {
  const markup = ReactDomServer.renderToString(React.createElement(app));
  console.log(markup);
  reply.type('html').send(`
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <title>Fabric React</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link href="https://assets.finn.no/pkg/@fabric-ds/css/v1/fabric.min.css" rel="stylesheet" />
      </head>
      <body>
        <div id="app">${markup}</div>
        <script src="./client.js" type="module"></script>
      </body>
    </html>
  `);
});

server.listen(3000);
