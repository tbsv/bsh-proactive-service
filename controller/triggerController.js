// Add all the required packages
var log = require('winston');
var config = require('../config/config');
var bsh = require('../controller/bshController');
var fitbit = require('../controller/fitbitController');

// Fetch sleep logs #FITBIT
exports.fetchData = function(req, res) {

    // Fetch the data for every user in userdb
    fitbit.fetchLogs(req, function(logs) {
        checkData(logs);
    });

};

// Check sleep logs #INTERNAL
function checkData (logs) {

    var log = JSON.parse(logs);
    var sleeplog = log.sleep[0];

    if (sleeplog.duration >= 7000000) {
        var coffeeBeanAmount = 'ConsumerProducts.CoffeeMaker.EnumType.BeanAmount.Mild';
    }

    sendData(coffeeBeanAmount);

};

// Send data #BSH
function sendData (coffeeBeanAmount) {

    // Fetch the data for every user in userdb
    bsh.startCoffeemaker(coffeeBeanAmount);

};