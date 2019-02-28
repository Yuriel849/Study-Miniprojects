var fs = require('fs');

// explicit name -> synchronous method -> this method is a blocking code, Node will stop here and execute completely before moving on
// var toRead = fs.readFileSync('toRead.txt', 'UTF8');
// // second argument is character encoding

// console.log(toRead);

// fs.writeFileSync('writeTo.txt', toRead);
// second argument is what data we want to write in this file (first parameter)

// asynchronous method requires third parameter -> what method to execute when done
fs.readFile('toRead.txt', 'utf8', function(err, data) { // first parameter is err data (if there is an error), second parameter is data retrieved from reading the file
    console.log(data);
    fs.writeFileSync('writeTo.txt', data);
});
// because this is asynchronous, this does not block, following code is executed while the file is being read -> if there are multiple things to do, using asynchronous methods will allow other work to be done at the same time

console.log('test');

// using just fs.unlink() causes an error -> apparently because it's asynchronous and requires a callback
fs.unlinkSync('writeTo.txt');