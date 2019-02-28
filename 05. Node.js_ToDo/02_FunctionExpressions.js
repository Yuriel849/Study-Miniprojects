/* JavaScript normal function statement
function example() {
    console.log("hello");
}

example(); -> actually calls the function
 */

 // Node.js function expression
 var example = function(){ // anonymous function (no name) -> this is a function expression
     console.log("good night");
 };

// variable "example" is equal to the anonymous function
// "example" is a variable that is equal to a function, that function is invoked by adding paranetheses
example();

// passing functions as parameters
function callFunction(func) { // callFunction accepts another function as an argument
    func();
}

callFunction(example);