var counter = function(arr) { // Accepts an array as a parameter
    return "There are " + arr.length + " elements in this array.";
}

/* Instead of using variables, directly connect the functions to module.exports like this:
module.exports.adder = function(a,b) { ... };
 */

var adder = function(a,b) { // Using template string -> variables, expressions can be embedded without concatenating like in counter above
    return `The sum of the two numbers is ${a+b}`;
}
var pi = 3.142;

/* The following code designates what is to be returned when this file is required elsewhere as a module (using require())
        "module.exports" is just an empty object
        "module.exports.counter" is the property named "counter" within the module.exports object
module.exports.counter = counter;
module.exports.pi = pi;
 */

/* The following is the same code as above, but instead of individually designated properties,
        a single JS object is utilized to designate all the properties all in one place
 */
module.exports = {
    counter : counter,
    adder : adder,
    pi : pi
};



