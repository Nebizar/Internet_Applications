var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var session = require('express-session');


var indexRouter = require('./routing/index');
var loginRouter = require('./routing/login');
var editRouter = require('./routing/edit');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(session({
  secret: 'thisissecret',
  resave: false, // don't save session if unmodified
  saveUninitialized: false // don't create session until something stored
}));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/login', loginRouter);
app.use('/editor', editRouter);

app.listen(3000, () => {
 console.log('Server running at http://localhost:3000/');
});

module.exports = app;
