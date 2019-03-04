var express = require('express');
var toDoController = require('./controllers/toDoController.js');
var app = express();

// Set ejs as the template engine
app.set('view engine', 'ejs');

// Use express.static to handle static files
app.use(express.static('./public'));

// Fire controllers
toDoController(app);

// Listen to port 3000
app.listen(3000);
console.log('Listening to port 3000');