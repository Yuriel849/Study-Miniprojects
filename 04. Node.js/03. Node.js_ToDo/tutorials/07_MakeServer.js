var http = require('http');

// Node.js core module "http" provides createServer() to easily make a server
var server = http.createServer(function(req, res) { // Whenever a request is sent to this server, this function will fire
    console.log('Request was made : ' + req.url);
    res.writeHead(200, {'Content-Type' : 'text/plain'});
    res.end('Hello world'); // ends response and sends it, along with the data within the paranetheses
});

server.listen(3000, '127.0.0.1'); // set port number and IP
console.log('Server now listening to port 3000');

// ctrl + C -> Shuts down the running server