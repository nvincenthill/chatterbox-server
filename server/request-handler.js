/*************************************************************

You should implement your request handler function in this file.

requestHandler is already getting passed to http.createServer()
in basic-server.js, but it won't work as is.

You'll have to figure out a way to export this function from
this file and include it in basic-server.js so that it actually works.

*Hint* Check out the node module documentation at http://nodejs.org/api/modules.html.

**************************************************************/
let messages = [];

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
    });
  }

  // handle GET requests
  if (request.method === 'GET') {
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

  console.log(
    'Serving request type ' + request.method + ' for url ' + request.url
  );

  const defaultCorsHeaders = {
    'access-control-allow-origin': '*',
    'access-control-allow-methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'access-control-allow-headers': 'content-type, accept',
    'access-control-max-age': 10 // Seconds.
  };

  const headers = defaultCorsHeaders;
  headers['Content-Type'] = 'text/plain';

  response.writeHead(statusCode, headers);

  const responseBody = { method, url};
  responseBody.results = messages;

  response.end(JSON.stringify(responseBody));
};

exports.requestHandler = requestHandler;
