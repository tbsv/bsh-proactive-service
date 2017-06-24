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

// Start coffeemaker #BSH
exports.startCoffeemaker = function(coffeeBeanAmount) {

    oauth.findToken('bsh', function (bshToken) {

        // Payload for the coffee programm (eg. bean amount)
        var payload = {
            data: {
                key: "ConsumerProducts.CoffeeMaker.Program.Beverage.Coffee",
                options: [
                    {
                        key: "ConsumerProducts.CoffeeMaker.Option.BeanAmount",
                        value: coffeeBeanAmount
                    }]
            }
        };

        // Request options
        var reqOptions = {
            url: config.bsh.apiUrl + 'BOSCH-HCS06COM1-1EA653F9A0A59C' + '/programs/active',
            method: 'PUT',
            headers: {
                'Authorization': 'Bearer ' + bshToken,
                'Accept': 'application/vnd.bsh.sdk.v1+json',
                'Content-Type': 'application/vnd.bsh.sdk.v1+json'
            },
            json: payload

        };

        // POST call to BSH Home Connect API
        request(reqOptions, function (error, response, body) {
            if (error) {
                log.error(res.statusCode + ': Requesting BSH API failed.');
            } else {
                // Debugging
                if (response.statusCode !== 204) {
                    log.error(response.statusCode + ': Starting coffeemaker failed.');
                } else {
                    log.info(response.statusCode + ': Started coffeemaker successfully. ' + coffeeBeanAmount);
                }
            }
        });

    });

};