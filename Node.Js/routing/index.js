var express = require('express');
var router = express.Router();
var path = require('path');
var fs = require('fs');


/* GET home page. */
router.get('/', function (req, res, next) {
  if (req.session.user) {
    let user = req.session.user;
	const data_path = 'data';
	var filename = path.join(data_path, user + '.json');
	fs.readFile(filename, (err, data) => {  
		if (err) throw err;
		let user = JSON.parse(data);
		console.log(user);
		let docs = user.notes;
		res.render('notes', { mylist: docs });
	});
  } else res.render('index', { title: 'Notebook' });
});


router.get('/logout', function (req, res, next) {
  req.session.user = null;
  req.session.notes = null;
  res.redirect('/');
})


module.exports = router;
