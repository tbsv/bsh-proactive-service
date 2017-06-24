var express = require('express');
var router = express.Router();
var config = require('../config/config');
var fitbit = require('../controller/fitbitController');


/* GET -> authorize */
router.get('/authorize',  fitbit.authorizeUser);

/* GET -> callback */
router.get('/callback',  fitbit.getAccessToken);

module.exports = router;
