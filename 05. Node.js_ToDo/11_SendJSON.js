var http = require('http');
var fs = require('fs');

var server = http.createServer(function(req, res) { // whenever a request is sent to this server, this function will fire
    console.log('Request was made : ' + req.url);
    res.writeHead(200, {'Content-Type' : 'application/json'});
    var obj = {
        name : 'Alice',
        job : 'Queen',
        age : 100
    };
    res.end(JSON.stringify(obj)); // cannot use res.end(obj) because .end() expects either a string or a buffer as a parameter... obj is a JS object
});

server.listen(3000, '127.0.0.1'); // set port number and IP
console.log('Server now listening to port 3000');