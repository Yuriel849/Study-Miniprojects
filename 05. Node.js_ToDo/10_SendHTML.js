var http = require('http');
var fs = require('fs');

var server = http.createServer(function(req, res) { // whenever a request is sent to this server, this function will fire
    console.log('Request was made : ' + req.url);
    res.writeHead(200, {'Content-Type' : 'text/html'});
    var readStrm = fs.createReadStream(__dirname + "/index.html", 'UTF8'); // create readable stream, designate which file to read within parantheses
    readStrm.pipe(res); // response object is writeable stream as well!
});

server.listen(3000, '127.0.0.1'); // set port number and IP
console.log('Server now listening to port 3000');