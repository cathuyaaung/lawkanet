console.log('process.env.NODE_ENV:', process.env.NODE_ENV);

	// set variables for app
	var express     = require('express');
	var app         = express();
	var path        = require('path');
	var bodyParser  = require('body-parser');
	var mysql       = require('mysql');

	var credentials;

	switch(process.env.NODE_ENV){
		case 'prod':
			credentials = require('./credentials_prod');
			break;
		case 'dev':
			credentials = require('./credentials_dev');
			break;
		default:
			credentials = require('./credentials_dev');
			break;
	}

	console.log(credentials.host + ":" + credentials.port + ":" + credentials.user);

	// Setup MySQL Connection
	var connection  = mysql.createConnection(credentials);
	// Connect to MySQL DB
	connection.connect();

	// configure app to use bodyParser()
	// this will let us get the data from a POST
	app.use(bodyParser.urlencoded({ extended: true }));
	app.use(bodyParser.json());

	// views as directory for all template files
	app.set('views', path.join(__dirname, 'views'));
	app.set('view engine', 'ejs'); // use either jade or ejs
	// instruct express to server up static assets
	app.use(express.static('public'));

	// Support for Crossdomain JSONP
	app.set('jsonp callback name', 'callback');

	// Get the Routes for our API
	var apiRouter = require('./routers/api')(express, connection);


	// Apply Routes to App
	// All of these routes will be prefixed with /api
	app.use('/api', apiRouter);


	// non api route for our views
	app.get('/', (req, res) => {
		res.render('index');
	});

	// Better way to disable x-powered-by
	app.disable('x-powered-by');


module.exports = app;
