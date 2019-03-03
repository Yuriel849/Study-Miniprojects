/* When I run this file using "node .\01_GlobalObjects.js" in the command line,
 *      all the functions within are started automatically and simultaenously
 */

console.log("Node.js Tutorials..") // Prints this on the terminal

// Fires the function after 3,000 milliseconds (3 seconds)
setTimeout(function() {
    console.log('3 seconds have passed');
}, 3000);

// Fires the function every 2 seconds (unending loop) -> end with ctrl + C
var time = 0;
var timer = setInterval(function() {
    time += 2;
    console.log(time + " seconds have passed");
    // If the value of the "time" variable is greater than 5, cancel the "timer" object created by setInterval() -> i.e. stop the loop
    if(time > 5) {
        clearInterval(timer);
    }
}, 2000);

// Prints the current directory that this file is located in
console.log(__dirname);

// Prints the current directory + filename of this file
console.log(__filename);
