var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

/* GET setup page. */
router.get('/setup', function(req, res, next) {
    res.render('setup');
});

module.exports = router;
