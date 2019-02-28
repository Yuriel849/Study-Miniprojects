var fs = require('fs');

// synchronous creation of directory
// fs.mkdirSync('test');

// fs. rmdirSync('test');

// asynchronous creation of directory
// fs.mkdir('test', function() {
//     fs.readFile('toRead.txt', 'utf8', function(err, data) {
//         fs.writeFile('./test/writeHere.txt', data, function() {});
//     });
// });

// must remove directory contents before removing directory
fs.unlink('./test/writeHere.txt', function() {
    fs.rmdir('test', function() {});
});

