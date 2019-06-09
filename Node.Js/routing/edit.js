var express = require('express');
var router = express.Router();
var session = require('express-session');
var path = require('path');
var fs = require('fs');


router.use(session({
  secret: 'thisissecret',
  resave: false, // don't save session if unmodified
  saveUninitialized: false // don't create session until something stored
}));

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('editor');
});

router.post('/', function (req, res, next) {
	let doc = {
		timestamp: new Date(),
		content: req.body.content
	}
	let user = req.session.user;
	const data_path = 'data';
	var filename = path.join(data_path, user + '.json');
	fs.readFile(filename, (err, data) => {  
		if (err) throw err;
		let user = JSON.parse(data);
		console.log(user);
		user.notes.push(doc);
		fs.writeFile(filename, JSON.stringify(user), function (err) {
			if (err) return console.log(err);
			
		});
	});
	res.redirect('./');

});


module.exports = router;
