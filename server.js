// requires
var express = require('express');
var app = express();
var index = require('./modules/routes/index');
var login = require('./modules/routes/login');
var register = require('./modules/routes/register');
var italk = require('./modules/routes/italk');


// uses
app.use(express.static('public'));
app.use('/', index);
app.use('/login', login);
app.use('/register', register);
app.use('/italk', italk);

// globals
var port = process.env.PORT || 2017;

// spin up server
app.listen(port, function() {
console.log('server up on:', port);
}); // end spin up
