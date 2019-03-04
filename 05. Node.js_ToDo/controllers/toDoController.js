// Controller for all request handlers
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({extended : false});

// Connect to the database
var mongoose = require('mongoose');
mongoose.connect('mongodb+srv://test:test@cluster-1a-4v3uv.mongodb.net/todo(test)?retryWrites=true', { useNewUrlParser : true });
                              //ID: test, PW: test, DB: todo(test)

// Create a schema for MongoDB (template for adding new data, tells MongoDB what kind of input to expect)
var toDoSchema = new mongoose.Schema({
    item : String
});

// Create a collection(==model) for MongoDB
var ToDo = mongoose.model('ToDo', toDoSchema);

// Test dummy data
// var data = [{item : 'Wash the dishes'}, {item : 'Walk the dog'}, {item : 'Get groceries'}];

module.exports = function(app) { // The "app" here is the "app" in app.js (controller is fired in app.js, with "app" provided as parameter)
    // Get data from MongoDB and pass to view
    app.get('/todo', function(req, res) {
        ToDo.find({}, function(err, data) { // Finds the designated, or all items in the designated collection -> currently all, "{}"
            if(err) { throw err; }
            res.render('todo', {todos : data}); // "data" is the data returned by ".find()"
        });
    });

    // Get data from view and add to MongoDB
    app.post('/todo', urlencodedParser, function(req, res) {
        var newToDo = ToDo(req.body).save(function(err, data) { // -> Adds the request body data to MongoDB, then ".save()" returns data
            if(err) { throw err; }
            res.json(data);
        });
        // For testing prior to MongoDB
//      data.push(req.body); // Add the data from the request to the "data" array above
//      res.json(data);
    });

    app.delete('/todo/:item', function(req, res) {
        // Delete the requested item from MongoDB
        ToDo.find({item : req.params.item.replace(/\-/g, " ")}).deleteOne(function(err, data) {
            if(err) { throw err; }
            res.json(data);
        });
        // For testing prior to MongoDB
//      data = data.filter(function(todo) { // "todo" is each item in "data"
//          return todo.item.replace(/ /g, '-') !== req.params.item; // Returns true OR false -> ".filter()" automatically filters out false returns
//      });
//      res.json(data);
    });
};