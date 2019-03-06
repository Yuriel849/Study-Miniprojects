let i = 1;
setInterval(() => {
    if(i === 5) {
        console.log('종료!');
        process.exit(); // Terminates a currently running Node process
                        // If used on a server, the server terminates as well, so rarely used on servers
            // process.exit() can receive parameters -> No parameter or parameter of 1 means proper termination
                                                  // -> Parameter of 1 means termination from error
    }
    console.log(i);
    i += 1;
}, 1000);