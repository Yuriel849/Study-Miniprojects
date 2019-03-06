// Copy a file without using piping the readStream to the writeStream
const fs = require('fs');

    // fs.copyFile(file to copy, path and name for new file, callback)
fs.copyFile('readme.txt', 'writeToHere.txt', (error) => {
    if(error) { return console.log(error); }
    console.log('복사 완료');
});
