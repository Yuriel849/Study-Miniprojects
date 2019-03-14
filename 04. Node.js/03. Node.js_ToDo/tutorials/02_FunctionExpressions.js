/* JavaScript normal function statement
function example() {
    console.log("hello");
}

example(); -> Where the function is actually called
 */

 // Node.js function expression
 var example = function(){ // Anonymous function (no name) -> This is a function expression
     console.log("good night");
 };

// The variable "example" is equal to the anonymous function
// "example" is a variable that is equal to a function, and that function is invoked by adding parantheses like below:
example();

// Passing functions as parameters
function callFunction(func) { // callFunction() accepts another function as an argument
    func();
}

callFunction(example);