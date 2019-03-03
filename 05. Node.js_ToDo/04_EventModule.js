var things = require('./misc'); // This is a custom module

/* "events" -> One of Node.js' built-in core modules -> A core module can be used just by designating the name, no path necessary
               One of the things returned by the events module is the event emitter
                   -> Used to create custom events, and react to those events when they are emitted
 */
var events = require('events');

var myEmitter = new events.EventEmitter();
// myEmitter.on() is the event listener
myEmitter.on('someEvent', function(msg) {
    console.log(msg);
})
// 1st argument is what event to emit, 2nd argument is the parameter to pass on
myEmitter.emit('someEvent', 'The event was emitted!');

var utils = require('util'); // Utilities core module

// Constructor for JS object
var Person = function(name) {
    this.name = name;
    // Whenever a new JS object is created with this constructor, it will have a property "name" and the value will be the argument passed on
};

// 1st argument is object that should inherit something, 2nd argument is what should be inherited
utils.inherits(Person, events.EventEmitter);

var john = new Person('John');
var alice = new Person('Alice');
var mary = new Person('Mary');
var people = [john, alice, mary];
people.forEach(function(person) {
    person.on('speak', function(msg) { // Using the inherited EventEmitter for each object ("person")
        console.log(person.name + " said : " + msg);
    });
})

john.emit('speak', 'hello');
alice.emit('speak', 'good night');
mary.emit('speak', "it's one in the afternoon");