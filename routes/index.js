var express = require('express');
var router = express.Router();
var oauth = require('../controller/oauthController');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

/* GET setup page. */
router.get('/setup', function(req, res, next) {
    res.render('setup');
});

/* GET sleeploogs page. */
router.get('/sleeplogs', function(req, res, next) {
    res.render('sleeplogs');
});

module.exports = router;
