// acquire "express" package to use here
var express = require('express');
// fire the returned function, in order to utilize the various methods of express
var app = express();
// listen to the designated port (app.listen creates a server, same as http.createServer())
app.listen(3000);

app.get('/', function(req, res) {
    // Note: Content-Type is not designated, but express figures it out
    res.send('This is the homepage');
});

app.get('/contact', function(req, res) {
    res.send('This is the contact page');
});

// ex) SNS URI -> /profile/{id}
app.get('/profile/:id/:date', function(req, res) {
    res.send('You requested to see a profile with the id of ' + req.params.id
        + ' and the date of ' + req.params.date
    );
});

