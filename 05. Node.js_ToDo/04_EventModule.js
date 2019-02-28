var things = require('./misc'); // this is a custom module

// Event module -> one of Node.js built-in core modules
// core module can be used just by designating the name, no path needed
var events = require('events');

// one of the things returned by the event module is the event emitter -> use to create custom events, and react to those events when they are emitted
// element.on('click', function() {}) -> jQuery event listener -> similar

var myEmitter = new events.EventEmitter();

// myEmitter.on() is the event listener
myEmitter.on('someEvent', function(msg) {
    console.log(msg);
})
// first argument is what event to emit, second argument is parameter to pass on
myEmitter.emit('someEvent', 'The event was emitted!');

var utils = require('util'); // utilities core module

// constructor
var Person = function(name) {
    this.name = name; // whenever a new JS object is created with this constructor, it will have a property "name", and the value will be the argument passed on when using the constructor
};

// first argument is object that should inherit something, second argument is what should be inherited
utils.inherits(Person, events.EventEmitter);

var john = new Person('John');
var alice = new Person('Alice');
var mary = new Person('Mary');
var people = [john, alice, mary];
people.forEach(function(person) {
    person.on('speak', function(msg) {
        console.log(person.name + " said : " + msg);
    });
})

john.emit('speak', 'hello');
alice.emit('speak', 'good night');
mary.emit('speak', "it's one in the afternoon");
