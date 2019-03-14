setImmediate(() => {
    console.log('immediate');
});

setTimeout(() => {
    console.log('timeout')
}, 0);

// Microtasks -> process.nextTick & Promise -> prioritized over setImmediate & setTimeout
              // Microtasks are placed in a separate microtask queue, parallel to task queue (unlike tasks, no background)
process.nextTick(() => {
    console.log('nextTick');
});

Promise.resolve().then(() => console.log('promise'));