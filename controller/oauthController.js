// Add all the required packages
var log = require('winston');

// Create new user #INTERNAL
exports.saveToken = function(type, accessToken) {

    var newToken = {
        type: type,
        access_token: accessToken
    };

    database.tokendb.findOne({ type: newToken.type }, function (err, token) {
        if (err) {
            log.error('Accessing db failed.');
        } else if (token) {
            log.silly('Token already in db.');
        } else {
            database.tokendb.insert(newToken, function (err, newDoc) {
                if (err) {
                    log.error('Saving token in db failed.');
                } else {
                    log.info('Saved token in db successfully. ' + newDoc.access_token);
                }
            });
        }
    });

};