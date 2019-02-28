var http = require('http');
var fs = require('fs');

var server = http.createServer(function(req, res) { // whenever a request is sent to this server, this function will fire
    console.log('Request was made : ' + req.url);
    if(req.url === '/home' || req.url === '/') {
        res.writeHead(200, {'Content-Type' : 'text/html'});
        fs.createReadStream(__dirname + '/index.html').pipe(res);
    } else if(req.url === '/contact') {
        res.writeHead(200, {'Content-Type' : 'text/html'});
        fs.createReadStream(__dirname + '/contact.html').pipe(res);
    } else if(req.url === '/api/wolves') {
        var obj = [{name : 'wolf', age: 10}, {name: 'white', age: 20}];
        res.writeHead(200, {'Content-Type' : 'application/json'});
        res.end(JSON.stringify(obj));
    } else { // if the requested url doesn't match any of the ones above...
        res.writeHead(404, {'Content-Type' : 'text/html'});
        fs.createReadStream(__dirname + '/404.html').pipe(res);
    }
});

server.listen(3000, '127.0.0.1'); // set port number and IP
console.log('Server now listening to port 3000');