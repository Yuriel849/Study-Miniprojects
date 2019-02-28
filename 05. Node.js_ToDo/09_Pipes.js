var http = require('http');

// read a file through a stream
var fs = require('fs');

// Node.js core module "http" provides the createServer() to easily make a server
var server = http.createServer(function(req, res) { // whenever a request is sent to this server, this function will fire
    console.log('Request was made : ' + req.url);
    res.writeHead(200, {'Content-Type' : 'text/plain'});
    var readStrm = fs.createReadStream(__dirname + "/toRead.txt", 'UTF8'); // create readable stream, designate which file to read within parantheses
    readStrm.pipe(res); // response object is writeable stream as well!
    // res.end unncessary, using .pipe() does the same thing, ending the response
});

server.listen(3000, '127.0.0.1'); // set port number and IP
console.log('Server now listening to port 3000');