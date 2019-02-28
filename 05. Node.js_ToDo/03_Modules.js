// Usually programmers split code into logical modules, which are located in their own separate files
// (a module is just another, separate JS file)

// Using the count module in this file -> use require() -> global object, can be used anywhere
var things = require('./misc'); // designate path within paranetheses; file extension unneeded, Node.js finds the relevant file on its own
// var counter receives whatever is returned from the module "count" -> in count.js, what is returned is the function expression "counter"

console.log(things.counter(['Waterman', 'Lamy', 'Sailor']));
console.log(things.adder(things.pi,6));
