let handleRequest = require('./request-handler');
handleRequest = handleRequest.requestHandler;

const http = require('http');
const express = require('express');
const logger = require('morgan');

const app = express();

const port = 3000;
const ip = '127.0.0.1';

const server = app.listen(port);
console.log('Listening on http://' + ip + ':' + port);

app.use(handleRequest);