//Dependencies - Express 4.x and the MySQL Connection



module.exports = (express, connection) => {
	var router      = express.Router();

	var usersRouter 	= require('./users')(express, connection);
	var postsRouter 	= require('./posts')(express, connection);
	var commentsRouter 	= require('./comments')(express, connection);


	// Router Middleware
	router.use((req, res, next) => {
	    // log each request to the console
	    console.log("/api", req.method, req.url);
	    // CORS
	    res.header("Access-Control-Allow-Origin", "*"); //TODO: potentially switch to white list version
	    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	    // continue doing what we were doing and go to the route
	    next();
	});

	// API ROOT - Display Available Routes
	router.get('/', (req, res) => {
	    res.jsonp({
	        name: 'Panorama API',
	        version: '1.0',
	    });
	});

	// Simple MySQL Test
	router.get('/test', (req, res) => {
	    var test;
	    connection.query('SELECT 1 + 1 AS solution', (err, rows, fields) => {
	        if (err) throw err;
	        test = rows[0].solution;
	        res.jsonp({
	            'test': test
	        });
	    });
	});

	router.use('/users', 	usersRouter);
	router.use('/posts', 	postsRouter);
	router.use('/comments',	commentsRouter);

	// 404
	router.use(function(req, res, next){
		res.status(404).send('API not found');
		next();
	});

	return router;
};
