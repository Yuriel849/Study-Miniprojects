// Acquire "express" package to use here
var express = require('express');
// Fire the returned function, in order to utilize the various methods of express
var app = express();
// Acquire "body-parser" module to use here
var bodyParser = require('body-parser');
// Create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended : false});
// Designate ejs as the default view engine(==template engine) for express to use -> Now express will check the "/views" directory when a view is required
app.set('view engine', 'ejs');
// Use the "static" middleware built into express to handle static files
app.use('/assets', express.static('assets'));
    /*
        1st parameter is a URI route designation; if not designated, this middleware will apply to every request
        2nd parameter uses the built-in "static" middleware and designates a target directory
        For every URI starting with "assets", this middleware will fire, and check the target directory ("assets") for the requested file
     */

/*
    Standard form of middleware
app.use([URI], function(req, res, next) { -> next indicates the next middleware
    next(); -> command to procede to the next middleware
});
 */

// Listen to the designated port (app.listen creates a server, same as http.createServer())
app.listen(3000);

app.get('/', function(req, res) {
    // Note: Content-Type is not designated, but express figures it out
//  res.send('This is the homepage');
//  res.sendFile(__dirname + "/index.html");
    res.render('index');
});

app.get('/contact', function(req, res) {
//  res.send('This is the contact page');
//  res.sendFile(__dirname + "/contact.html");
    res.render('contact', {qString : req.query});
});

app.post('/contact', urlencodedParser, function(req, res) { // urlencodedParser() is fired everytime a POST request to "/contact" is made -> urlencodedParser parses the body of the POST request, then stores it in req.body
    res.render('contact-success', {data : req.body});
});

app.get('/profile/:id/:date', function(req, res) { // Express doesn't care whether the "id" & "date" parameters are actually an ID and a date
//    res.send('You requested to see a profile with the id of ' + req.params.id + ' and the date of ' + req.params.date);
    // dummy data
    var data = {age : 20, job : 'king', hobbies : ['eating', 'sleeping', 'reading']};

    // Use the "render()" when returning an ejs file as the view
    res.render('profile', {person : req.params.id, date : req.params.date, data : data}); // express already knows to check the /views directory -> I only need to designate the name of the ejs file
    // I can pass data to the ejs file by putting it inside a JS object, which becomes the 2nd parameter of ".render()"
});

