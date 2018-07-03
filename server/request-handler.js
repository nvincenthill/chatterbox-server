const fs = require('fs');

// message database
let messages = [];

// handle http requests
const requestHandler = function(request, response) {

  const { method, url } = request;

  if (request.method === 'POST') {
    let body = [];
    request.on('error', (err) => {
    }).on('data', (chunk) => {
      body.push(chunk);
    }).on('end', () => {
      body = Buffer.concat(body).toString();
      messages.push(JSON.parse(body));
      messages[messages.length - 1].objectId = messages.length;
    });
  }

  // handle GET requests
  if (request.method === 'GET') {
    statusCode = 200;
  }

  // handle OPTIONS requests
  if (request.method === 'OPTIONS') {
    statusCode = 200;
  }

  // handle POST requests
  if (request.method === 'POST') {
    statusCode = 201;
  }

  // handle non-existent endpoints
  if (request.url !== '/classes/messages') {
    statusCode = 404;
  }

  // serve local html file 
  if (request.url.includes('/index')) {
    fs.readFile('client/index.html', "utf8", function(err, data){
      if(err){
        return console.log(err);
      }
      const defaultCorsHeaders = {
        'access-control-allow-origin': '*',
        'access-control-allow-methods': 'GET, POST, OPTIONS',
        'access-control-allow-headers': 'content-type, accept',
        'access-control-max-age': 10 // Seconds.
      };
    
      const headers = defaultCorsHeaders;
      headers['Content-Type'] = 'text/html';

      response.writeHead(200, headers);
      response.end(data);
    });
    return;
  }


  console.log(
    'Serving request type ' + request.method + ' for url ' + request.url
  );


  // handle headers
  const defaultCorsHeaders = {
    'access-control-allow-origin': '*',
    'access-control-allow-methods': 'GET, POST, OPTIONS',
    'access-control-allow-headers': 'content-type, accept',
    'access-control-max-age': 10 // Seconds.
  };
  const headers = defaultCorsHeaders;
  headers['Content-Type'] = 'text/plain';
  response.writeHead(statusCode, headers);
  const responseBody = {method, url};
  if (request.method === 'GET') {
    responseBody.results = messages;
  }

  // write data
  response.end(JSON.stringify(responseBody));
};

exports.requestHandler = requestHandler;
