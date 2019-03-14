// Controller for receiving GET & POST requests

// Set up body-parser
const bodyParser = require('body-parser');
const urlencodedParser = bodyParser.urlencoded({extended : false});

module.exports = function(app) { // The "app" here is the "app" in app.js (controller is fired in app.js, with "app" provided as parameter)
    app.get('/node', (req, res) => {
        console.log("Incoming GET request");
        console.log(req.url);
        query = req.query;
        console.log(query);
        for (const key in query) {
            // For use when the URI has been encoded in Java before sending...
                // express appears to separate the query string into keys and values before decoding,
                // equal sign is also encoded in Java and express appears to be unable to separate (entire query is treated as key with no value)
    //      var result = key.substring(0, key.indexOf("="));
    //      var resultValue = key.substring(key.indexOf("="));
            console.log(key, query[key])
        }
        res.sendStatus(200);
    })

    app.post('/node', urlencodedParser,  (req, res) => {
        console.log("Incoming POST request");
        
        console.log(req.body);
        console.log(req.body.OrderCode);
    });
};