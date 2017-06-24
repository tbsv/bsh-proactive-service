var express = require('express');
var router = express.Router();
var bsh = require('../controller/bshController');
var config = require('../config/config');

/* GET -> authorize */
router.get('/authorize',  bsh.authorizeUser);

/* GET -> callback */
router.get('/callback',  bsh.getAccessToken);

module.exports = router;
