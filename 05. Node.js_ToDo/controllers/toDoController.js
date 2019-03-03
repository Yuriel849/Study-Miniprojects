// Controller for all request handlers
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({extended : false});
var data = [{item : 'Wash the dishes'}, {item : 'Walk the dog'}, {item : 'Get groceries'}];

module.exports = function(app) { // The "app" here is the "app" in app.js
    app.get('/todo', function(req, res) {
        res.render('todo', {todos : data});
    });

    app.post('/todo', urlencodedParser, function(req, res) {
        data.push(req.body); // Add the data from the request to the "data" array above
        res.json(data);
    });

    app.delete('/todo', function(req, res) {

    });
};