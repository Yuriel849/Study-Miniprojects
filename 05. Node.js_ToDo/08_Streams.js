// Read a file via a stream
var fs = require('fs');
var readStrm = fs.createReadStream(__dirname + "/toRead.txt", 'UTF8');
    /*
    Creates readable stream,
        1st parameter designates which file to read
        2nd parameter designates which character encoding to use, "UTF8"
            without a designated character encoding, the data is logged as just the buffer data, not the original text!
     */
// Write to a file via a stream
var writeStrm = fs.createWriteStream(__dirname + '/writeTo.txt');

// The readable stream emits the event "data" every time it receives any data, which is sent to the callback function as the parameter "chunk"
readStrm.on('data', function(chunk) {
    console.log('New chunk of data received');
    writeStrm.write(chunk); // Takes the data "chunk" from the readable stream and prints it to the writeable stream
});

/* fs.readFile
      Grabs the entire file and waits for all the contents to be processed, before sending the data as a single supersize chunk of data
   BUT using buffers and streams allows the recipient to receive data sooner and quicker
 */