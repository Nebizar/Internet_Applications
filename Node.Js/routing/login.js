var express = require('express');
var router = express.Router();
var session = require('express-session');
var fs = require('fs');
var path = require('path');

router.use(session({
  secret: 'thisissecret',
  resave: false, // don't save session if unmodified
  saveUninitialized: false // don't create session until something stored
}));

router.get('/', function (req, res, next) {
  res.render('login');
});

router.post('/', function (req, res, next) {
  authenticate(req.body.username, function (err, user) {
    if (user) {
		const data_path = 'data';
		var filename = path.join(data_path, user + '.json');
		fs.open(filename,'r',function(err, fd){
			if (err) {
				let new_user = {
					username: user,
					notes: []
				};
				let user_string = JSON.stringify(new_user);
				fs.writeFile(filename, user_string, function(err) {
				if(err) {
					console.log(err);
				}
				console.log("The file was saved!");
				});
			} else {
				console.log("The file exists!");
			}
		});
		req.session.user = user;
		res.redirect('./')
    } else {
		req.session.error = "Authentication failed";
		res.redirect('/')
    }
  });

});

//TODO
function authenticate(user, callback) {
  return callback(null, user);
}


module.exports = router;
