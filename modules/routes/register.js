var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var bcrypt = require('bcrypt');
var pg = require('pg');

var config = {
  database: 'italk',
  host: 'localhost',
  port: 5432, // default port for postico
  max: 15
};

var pool = new pg.Pool(config);


router.post('/', function(req, res) {
  console.log('in register post:', req.body);
  // use bcrypt to gen a salt
  bcrypt.genSalt(12, function(err, salt) {
    if (err) {
      console.log('err:', err);
    } // end error
    else {
      console.log('salt', salt);
      bcrypt.hash(req.body.password, salt, function(err, hash) {
        if (err) {
          console.log('hash err:', err);
          res.sendStatus(400);
        } // end error
        else {
          console.log('hash:', hash);
          //only save hashed password
          var newUser = {
            username: req.body.username,
            password: hash
          };
          console.log('saving user:', newUser);
          // save newUser to db
          router.post('/addUser', function (req, res) {
            pool.connect(function (err, client, done) {
              if (err) {
                console.log('Error connecting to the DB', err);
                res.sendStatus(500);
                done();
                return;
              }

              client.query("INSERT INTO user (username, password) VALUES ($1, $2)", [req.body.username, req.body.password], function (err, result) {
                done();
                if (err) {
                  console.log('Error querying the DB', err);
                  res.sendStatus(500);
                  return;
                }

                console.log('Got rows from the DB:', result.rows);
                res.send(result.rows);
              });
            });
          });
        } // end no error
      }); // end hash
    } // end no error
  }); //end gen salt
});

module.exports = router;
