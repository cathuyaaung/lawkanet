//Dependencies - Express 4.x and the MySQL Connection
module.exports = (express, connection) => {
	var router      = express.Router();

	// api/posts
	router.get('/', (req, res) => {
	    res.jsonp({
	        name: 'Khit Luu API',
	        version: '1.0',
			route: 'api/comments'
	    });
	});



	// COLLECTION ROUTES
	router.route('/panoramas')
	    //we can use .route to then hook on multiple verbs
	    .post((req, res) => {
	        var data = req.body; // maybe more carefully assemble this data
	        console.log(req.body)
	        var query = connection.query('INSERT INTO panos SET ?', [data], (err, result) => {
	            if(err){
	                console.error(err);
	                res.sendStatus(404);
	            }else{
	                res.status(201);
	                res.location('/api/panoramas/' + result.insertId);
	                res.end();
	            }
	        });
	        console.log(query.sql);
	    })

	    .get((req, res) => {
	        var query = connection.query('SELECT * FROM panos', (err, rows, fields) => {
	            if (err) console.error(err);

	            res.jsonp(rows);
	        });
	        console.log(query.sql);
	    })

	    //We do NOT do these to the collection
	    .put((req, res) => {
	        //res.status(404).send("Not Found").end();
	        res.sendStatus(404);
	    })
	    .patch((req, res) => {
	        res.sendStatus(404);
	    })
	    .delete((req, res) => {
	        // LET's TRUNCATE TABLE..... NOT!!!!!
	        res.sendStatus(404);
	    });
	//end route

	// SPECIFIC ITEM ROUTES
	router.route('/panoramas/:id')
	    .post((req, res) => {
	        //specific item should not be posted to (either 404 not found or 409 conflict?)
	        res.sendStatus(404);
	    })

	    .get((req, res) => {
	        var query = connection.query('SELECT * FROM panos WHERE id=?', [req.params.id], (err, rows, fields) => {
	            if (err) {
	                //INVALID
	                console.error(err);
	                res.sendStatus(404);
	            }else{
	                if(rows.length){
	                    res.jsonp(rows);
	                }else{
	                    //ID NOT FOUND
	                    res.sendStatus(404);
	                }
	            }
	        });
	        console.log(query.sql);
	    })

	    .put((req, res) => {
	        var data = req.body;
	        var query = connection.query('UPDATE panos SET ? WHERE id=?', [data, req.params.id], (err, result) => {
	            if(err){
	                console.log(err);
	                res.sendStatus(404);
	            }else{
	                res.status(200).jsonp({changedRows:result.changedRows, affectedRows:result.affectedRows}).end();
	            }
	        })
	        console.log(query.sql)
	    })

	    .patch((req, res) => {
	        // Need to decide how much this should differ from .put
	        //in theory (hmm) this should require all the fields to be present to do the update?
	    })

	    .delete((req, res) => {
	        //LIMIT is somewhat redundant, but I use it for extra sanity, and so if I bungle something I only can break one row.
	        var query = connection.query('DELETE FROM panos WHERE id=? LIMIT 1', [req.params.id], (err, result) => {
	            if(err){
	                console.log(err);
	                res.sendStatus(404);
	            }else{
	                res.status(200).jsonp({affectedRows:result.affectedRows}).end();
	            }
	        });
	        console.log(query.sql)
	    });
	//end route

	return router;
};
