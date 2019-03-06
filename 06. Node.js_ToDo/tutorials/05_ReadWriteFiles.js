var fs = require('fs');

/* Node.js uses explicit names,
        you can tell whether a function is a synchronous one or not by checking whether it says "Sync" or not
   Synchronous function -> This function is a blocking code, Node will stop here and execute completely before moving on
   Asynchronous function -> This is not blocking code, any code after this will be executed at the same time that the asynchronous function is being executed
                            If there are multiple tasks to do, using an asynchronous function will allow the CPU to work on those tasks simultaneously
 */

 // var toRead = fs.readFileSync('toRead.txt', 'UTF8'); -> 2nd argument is the character encoding
// console.log(toRead);

// fs.writeFileSync('writeTo.txt', toRead); -> 2nd argument is what data we want to write in this file (1st parameter)

// Asynchronous functions require a third parameter -> What callback to execute when done with the asynchronous function
fs.readFile('toRead.txt', 'utf8', function(err, data) {
            // Callback's 1st parameter is err data (if there is an error),
                // 2nd parameter is data retrieved from reading the file
                           // (this data is in the buffer format! -> use toString() to change to a standard String)
                                 // When reading a file, Node creates a file-sized memory space and uses that as a buffer
    console.log(data);
    fs.writeFileSync('writeTo.txt', data);
});
console.log('test');

// Using just fs.unlink() causes an error -> Apparently because it's asynchronous and requires a callback as a parameter
fs.unlinkSync('writeTo.txt');