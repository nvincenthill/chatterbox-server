const http = require('http');
const fs = require('fs');

const port2 = 8080;

const ip2 = '127.0.0.1';

// fs.readFile('../client/index.html', function (err, html) {
//     if (err) {
//         throw err; 
//     }       
//     http.createServer(function(request, response) {  
//         response.writeHeader(200, {"Content-Type": "text/html"});  
//         response.write(html);  
//         response.end();  
//     }).listen(port2);
// });

const html = fs.readFile('/client/index.html', function(err, data) {
    http.createServer(function (req, res) {
      res.writeHead(200, {'Content-Type': 'text/html'});
      console.log(data);
      res.write(data);
      res.end();
    });
  });
console.log('Listening on http://' + ip2 + ':' + port2);
html.listen(port2, ip2);

// const fs = require('fs');
  // if (request.url === "/index") {
  //   fs.readFile('../client/index.html', function(err, data){
  //     // if (err) {
  //     //    response.writeHead(404);
  //     //    response.write("Not Found!");
  //     // }
  //     // else {
  //        response.writeHead(200, {'Content-Type': 'text/html'});
  //        response.write(data);
  //     // }
  //     response.end();
  //     return;
  //  });
//  } else 
//  if (request.url === "/classes/messages") {