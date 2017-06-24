// Global configuration file
var config = {};

// Global log level
config.logLevel = 'silly';

// Environmental variables
config.environment = "localhost";

// BSH API Oauth2
config.bsh = {
    apiUrl: 'https://developer.home-connect.com/api/homeappliances/',
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
    apiUrl: 'https://api.fitbit.com/1/user/',
    authorizeUrl: 'https://www.fitbit.com/oauth2/authorize',
    clientId: '***REMOVED***',
    clientSecret: '***REMOVED***',
    callbackUrl: 'http://localhost:3000/fitbit/callback',
    grantType: 'authorization_code',
    responseType: 'code',
    scope: 'activity%20heartrate%20profile%20sleep',
    tokenUrl: 'https://api.fitbit.com/oauth2/token',
    user: '***REMOVED***'
};

module.exports = config;