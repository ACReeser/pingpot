// server.js

// BASE SETUP
// =============================================================================

// call the packages we need
var express    = require('express'); 		// call express
var app        = express(); 				// define our app using express
var bodyParser = require('body-parser');

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 8080; 		// set our port


var mongoose   = require('mongoose');
mongoose.connect('mongodb://elevenses:elevenses@ds039860.mongolab.com:39860/elevenses'); // connect to our database
app.use(express.static(__dirname + '/'));

var Info     = require('./models/info');

// ROUTES FOR OUR API
// =============================================================================
var router = express.Router(); 				// get an instance of the express Router

// middleware to use for all requests
router.use(function(req, res, next) {
	// do logging
	console.log('Something is happening.');
	next(); // make sure we go to the next routes and don't stop here
});

router.route('/infos')

	// create an Info (accessed at POST http://localhost:8080/api/infos)
	.post(function(req, res) {
		
		var i = new Info(); 		// create a new instance of the Info model
		i.elevenses = req.body.elevenses;  // set the infos name (comes from the request)

		// save the info and check for errors
		i.save(function(err) {
			if (err)
				res.send(err);

			res.json({ message: 'Info created!' });
		});
		
	})
	.get(function(req, res) {
		Info.find(function(err, infos) {
			if (err)
				res.send(err);

			res.json(infos);
		});
	});
	
router.route('/infos/:info_id')

	// get the info with that id (accessed at GET http://localhost:8080/api/bears/:bear_id)
	.get(function(req, res) {
		Info.findById(req.params.info_id, function(err, info) {
			if (err)
				res.send(err);
			res.json(info);
		});
	}).put(function(req, res) {

		// use our info model to find the info we want
		Info.findById(req.params.info_id, function(err, info) {

			if (err)
				res.send(err);

			info.elevenses = req.body.elevenses; 	// update the bears info

			// save the bear
			info.save(function(err) {
				if (err)
					res.send(err);

				res.json({ message: 'Info updated!' });
			});

		});
	});
// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
router.get('/', function(req, res) {
	res.json({ message: 'hooray! welcome to our api!' });	
});

// more routes for our API will happen here

// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use('/api', router);

// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Magic happens on port ' + port);