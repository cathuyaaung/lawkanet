module.exports = (express, connection) => {
	var router = express.Router({mergeParams: true});


	router.get('/', (req, res) => {
		var query = connection.query('SELECT * FROM users',function(err,rows){
			if(err)
				res.jsonp({status: 0, data: rows});
			res.jsonp({status:1, data: rows});
		});
	});
	router.get('/:_id', (req,res,next) => {
		res.jsonp({
				name: 'Khit Luu API 2',
				version: '1.0',
		route: 'api/users/'+req.params._id
		});
	});
	router.get('/:_id/test', (req,res,next) => {
		res.jsonp({
				name: 'Khit Luu API',
				version: '1.0',
		route: 'api/users/'+req.params._id+'/test'
		});
	});

	return router;
};
