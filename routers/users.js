module.exports = (express, connection) => {
	var router = express.Router({mergeParams: true});


	router.get('/', (req, res) => {
	    res.jsonp({
	        name: 'Khit Luu API',
	        version: '1.0',
			route: 'api/users'
	    });
	});

	return router;
};
