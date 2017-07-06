var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var user = require('../user');
var bcrypt = require('bcrypt');
var userLogged;
var userID;


router.use(bodyParser.urlencoded({
  extended: true
}));
router.use(bodyParser.json());

router.get('/', function(req, res) {
  if (userLogged === undefined) {
    res.send('No User Logged');
  } else {
    var userData = {
      username: userLogged,
      id: userID
    };
    res.send(userData);
  }
});


router.post('/', function(req, res) {
  console.log('base url post hit:', req.body);
  // connect to db
  user.findOne({
    username: req.body.username
  }, function(err, user) {
    if (err) {
      // err connecting
      console.log('find user error:', err);
      res.sendStatus(400);
    } // end Error
    else {
      // connected
      // find user
      if (user != undefined) {
        // user found, compare text to hash
        console.log('comparing:', req.body.password, user.password);
        bcrypt.compare(req.body.password, user.password, function(err, isMatch) {
          if (err) {
            // error with bcrypt
            console.log('compare error:', err);
            res.sendStatus(400);
          } else {
            // no error with bcrypt
            console.log('found you!');
            if (isMatch) {
              userLogged = req.body.username;
              userID = user._id;
              var userData = {
                username: userLogged,
                id: userID
              };
              res.send(userData);
            } else {
              res.send('oh, noo!');
            }
          }
        }); // end compare
      } // end found user
      else {
        console.log('no user found');
        res.send(400);
      }
    } // end no error
  }); // end looking for user
});

module.exports = router;
