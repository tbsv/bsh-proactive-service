// Add all the required packages
var path = require('path');
var Datastore = require('nedb');

// Persistent datastore (with autoload)
database = {};
database.tokendb = new Datastore({ filename: path.join(__dirname, '../db/tokens.db'), autoload: true });