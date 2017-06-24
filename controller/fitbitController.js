// Add all the required packages
var log = require('winston');
var config = require('../config/config');
var request = require('request');
var oauth = require('../controller/oauthController');


// Authorize user #INTERNAL
exports.authorizeUser = function(req, res) {

    var fitbitAuthorization = config.fitbit.authorizeUrl + '?client_id=' + config.fitbit.clientId + '&redirect_uri=' + config.fitbit.callbackUrl + '&response_type=' + config.fitbit.responseType + '&scope=' + config.fitbit.scope;
    res.redirect(fitbitAuthorization);

};

// Get access token #INTERNAL
exports.getAccessToken = function(req, res) {

    var prepareBase64 = config.fitbit.clientId + ':' + config.fitbit.clientSecret;
    var buffer = new Buffer(prepareBase64);
    var basicAuth = 'Basic ' + buffer.toString('base64');

    // Request options
    var reqOptions = {
        url: config.fitbit.tokenUrl,
        method: 'POST',
        headers: {
            'Authorization': basicAuth,
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        form: {
            'client_id': config.fitbit.clientId,
            'redirect_uri': config.fitbit.callbackUrl,
            'grant_type': config.fitbit.grantType,
            'code': req.query.code
        }

    };

    // POST call to BSH Home Connect API
    request(reqOptions, function (error, response, body) {
        if(error) {
            log.error(res.statusCode + ': Requesting Fitbit API failed.');
        } else {
            // Debugging
            if (response.statusCode !== 200) {
                log.error(res.statusCode + ': Requesting access token failed.');
            } else {
                var responseBody = JSON.parse(body);
                log.info(res.statusCode + ': Requested access token successfully. ' + responseBody.access_token);
                // Save BSH AccessToken
                oauth.saveToken('fitbit', responseBody.access_token);
                res.redirect('/setup');
            }
        }
    });

};