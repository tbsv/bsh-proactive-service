// Global configuration file
var config = {};

// Global log level
config.logLevel = 'silly';

// Environmental variables
config.environment = "localhost";

// BSH API Oauth2
config.bsh = {
    authorizeUrl: 'https://developer.home-connect.com/security/oauth/authorize',
    clientId: '***REMOVED***',
    clientSecret: '***REMOVED***',
    callbackUrl: 'http://localhost:3000/bsh/callback',
    grantType: 'authorization_code',
    responseType: 'code',
    scope: 'IdentifyAppliance%20CoffeeMaker',
    tokenUrl: 'https://developer.home-connect.com/security/oauth/token'
};

// FitBit API Oauth2
config.fitbit = {
    authorizeUrl: 'https://www.fitbit.com/oauth2/authorize',
    clientId: '***REMOVED***',
    clientSecret: '***REMOVED***',
    callbackUrl: 'http://localhost:3000/fitbit/callback',
    grantType: 'authorization_code',
    responseType: 'code',
    scope: 'activity%20heartrate%20profile%20sleep',
    tokenUrl: 'https://api.fitbit.com/oauth2/token'
};

module.exports = config;