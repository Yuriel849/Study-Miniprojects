// Deleting a folder and its contents
const fs = require('fs');

    // fs.readdir(path, callback) -> Reads the folder at the given path, checking its contents
        // Returns array containing the names of files and folders within the folder that is read
fs.readdir('./folder', (err, dir) => {
    if(err) { throw err; }
    console.log('폴더 내용 확인', dir);
        // fs.unlink(path, callback) -> Deletes the file at the given path
            // Error occurs if the file doesn't not exist! MUST first check whether the file exists!
    fs.unlink('./folder/testFile.js', (err) => {
        if(err) { throw err; }
        console.log('파일 삭제 성공');
            // fs.rmdir(path, callback) -> Deletes the folder at the given path
                // Error occurs if there is something (file OR folder) within the folder to be deleted! MUST first delete contents!
        fs.rmdir('./folder', (err) => {
            if(err) { throw err; }
            console.log('폴더 삭제 성공');
        });
    });
});