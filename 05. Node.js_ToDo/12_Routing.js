var http = require('http');
var fs = require('fs');

var server = http.createServer(function(req, res) { // Whenever a request is sent to this server, this function will fire
    console.log('Request was made : ' + req.url);
    if(req.url === '/home' || req.url === '/') { // If the request url is ContextRoot + "/home" or ContextRoot + "/"
        res.writeHead(200, {'Content-Type' : 'text/html'});
        fs.createReadStream(__dirname + '/index.html').pipe(res);
    } else if(req.url === '/contact') { // If the request url is ContextRoot + "/contact"
        res.writeHead(200, {'Content-Type' : 'text/html'});
        fs.createReadStream(__dirname + '/contact.html').pipe(res);
    } else if(req.url === '/api/wolves') { // If the request url is ContextRoot + "/api/wolves"
        var obj = [{name : 'wolf', age: 10}, {name: 'white', age: 20}];
        res.writeHead(200, {'Content-Type' : 'application/json'});
        res.end(JSON.stringify(obj));
    } else { // If the requested url doesn't match any of the ones above...
        res.writeHead(404, {'Content-Type' : 'text/html'});
        fs.createReadStream(__dirname + '/404.html').pipe(res);
    }
});

server.listen(3000, '127.0.0.1'); // set port number and IP
console.log('Server now listening to port 3000');