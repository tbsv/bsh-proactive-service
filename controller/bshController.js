// Add all the required packages
var log = require('winston');
var config = require('../config/config');
var request = require('request');
var oauth = require('../controller/oauthController');


// Authorize user #INTERNAL
exports.authorizeUser = function(req, res) {

    var bshAuthorization = config.bsh.authorizeUrl + '?client_id=' + config.bsh.clientId + '&redirect_uri=' + config.bsh.callbackUrl + '&response_type=' + config.bsh.responseType + '&scope=' + config.bsh.scope;
    res.redirect(bshAuthorization);

};

// Get access token #INTERNAL
exports.getAccessToken = function(req, res) {

    // Request options
    var reqOptions = {
        url: config.bsh.tokenUrl,
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        form: {
            'client_id': config.bsh.clientId,
            'redirect_uri': config.bsh.callbackUrl,
            'grant_type': config.bsh.grantType,
            'code': req.query.code
        }

    };

    // POST call to BSH Home Connect API
    request(reqOptions, function (error, response, body) {
        if(error) {
            log.error(res.statusCode + ': Requesting BSH API failed.');
        } else {
            // Debugging
            if (response.statusCode !== 200) {
                log.error(res.statusCode + ': Requesting access token failed.');
            } else {
                var responseBody = JSON.parse(body);
                log.info(res.statusCode + ': Requested access token successfully. ' + responseBody.access_token);
                // Save BSH AccessToken
                oauth.saveToken('bsh', responseBody.access_token);
                res.redirect('/setup');
            }
        }
    });

};