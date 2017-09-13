module.exports = (express, connection) => {
	var router = express.Router({mergeParams: true});


	router.get('/', (req, res) => {
	    res.jsonp({
	        name: 'Khit Luu API',
	        version: '1.0',
			route: 'api/users'
	    });
	});
	router.get('/:_id', (req,res,next) => {
		res.jsonp({
				name: 'Khit Luu API',
				version: '1.0',
		route: 'api/users/'+req.params._id
		});
		next();
	});
	router.get('/:_id/test', (req,res,next) => {
		res.jsonp({
				name: 'Khit Luu API',
				version: '1.0',
		route: 'api/users/'+req.params._id+'/test'
		});
		next();
	});

	return router;
};
