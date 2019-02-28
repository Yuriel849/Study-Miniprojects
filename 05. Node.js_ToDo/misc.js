var counter = function(arr) { // accepts an array as an argument
    return "There are " + arr.length + " elements in this array.";
}

// instead of using variables, directly connect the functions to module.exports
// module.exports.adder = function(a,b) {
var adder = function(a,b) {
    return `The sum of the two numbers is ${a+b}`; // using template string -> variables, expressions can be embedded without concatenating like in counter above
}

var pi = 3.142;

// designates what is to be returned when this file is required elsewhere as a module (using require())
// module.exports.counter = counter; // module.exports is just an empty object -> "module.exports.counter" is the property named "counter" within the module.exports object
// module.exports.pi = pi;

// same code as above, but instead of individually designated properties, use a single JS object to designate all the properties all in one place
module.exports = {
    counter : counter,
    adder : adder,
    pi : pi
};



