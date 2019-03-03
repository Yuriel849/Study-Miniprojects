var fs = require('fs');

// Synchronous creation of directory
// fs.mkdirSync('test');
// Synchronous removal of directory
// fs. rmdirSync('test');

// Asynchronous creation of directory
// fs.mkdir('test', function() { // 1. Create the directory "test"
//     fs.readFile('toRead.txt', 'utf8', function(err, data) { // 2. Read the file "toRead.txt"
//         fs.writeFile('./test/writeHere.txt', data, function() {}); // 3. Write the file "writeHere.txt" within the new directory "test"
//     });
// });
// Asynchronous removal of directory
fs.unlink('./test/writeHere.txt', function() { // 1. Remove contents of directory
    fs.rmdir('test', function() {}); // 2. Remove directory
});