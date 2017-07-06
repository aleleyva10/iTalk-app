// requires
var express = require('express');
var app = express();
var pg = require('pg');
var index = require('./modules/routes/index');
var register = require('./modules/routes/register');
var login = require('./modules/routes/login');
var logout = require('./modules/routes/logout');
var phrases = require('./modules/routes/phrases');


// uses
app.use(express.static('public'));
app.use('/', index);
app.use('/register', register);
app.use('/login', login);
app.use('/logout', logout);
app.use('/phrases', phrases);

// globals
var port = process.env.PORT || 2017;

// spin up server
app.listen(port, function() {
console.log('server up on:', port);
}); // end spin up
