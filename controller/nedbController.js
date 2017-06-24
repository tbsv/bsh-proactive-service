// Add all the required packages
var path = require('path');
var Datastore = require('nedb');

// Persistent datastore (with autoload)
database = {};
database.sleeplogsdb = new Datastore({ filename: path.join(__dirname, '../db/sleeplogs.db'), autoload: true });