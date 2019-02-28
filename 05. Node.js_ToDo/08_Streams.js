var http = require('http');

// read a file through a stream
var fs = require('fs');
var readStrm = fs.createReadStream(__dirname + "/toRead.txt", 'UTF8'); // create readable stream, designate which file to read within parantheses
// without the second argument, the designated character encoding, "UTF8", the data is logged as just the buffer data, not the original text

// write to a file through a stream
var writeStrm = fs.createWriteStream(__dirname + '/toWrite.txt');


// The readable stream emits the event "data" every time it receives any data, which is sent to the callback function as the parameter "chunk"
readStrm.on('data', function(chunk) {
    console.log('New chunk of data received');
    writeStrm.write(chunk); // Takes the data "chunk" from the readable stream and prints it to the writeable stream
});

// fs.readFile -> grabs the entire file and waits for all the contents to be processed, before sending the entire data as a single supersize chunk of data -> using buffers and streams allows the recipient to receive data sooner and quicker


// // Node.js core module "http" provides the createServer() to easily make a server
// var server = http.createServer(function(req, res) { // whenever a request is sent to this server, this function will fire
//     console.log('Request was made : ' + req.url);
//     res.writeHead(200, {'Content-Type' : 'text/plain'});
//     res.end('Hello world'); // ends response and sends it, along with the data within the paranetheses
// });

// server.listen(3000, '127.0.0.1'); // set port number and IP
// console.log('Server now listening to port 3000');