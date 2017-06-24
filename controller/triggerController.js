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

    // If sleep duration >= 8h, brew a mild coffee
    if (sleeplog.duration >=28800000) {
        var coffeeBeanAmount = 'ConsumerProducts.CoffeeMaker.EnumType.BeanAmount.Mild';
    }

    // If sleep duration 6-8h, brew a normal coffee
    if (sleeplog.duration >= 21600000 && sleeplog.duration < 28800000) {
        var coffeeBeanAmount = 'ConsumerProducts.CoffeeMaker.EnumType.BeanAmount.Normal';
    }

    // If sleep duration 4-6h, brew a strong coffee
    if (sleeplog.duration >= 14400000 && sleeplog.duration < 21600000) {
        var coffeeBeanAmount = 'ConsumerProducts.CoffeeMaker.EnumType.BeanAmount.Strong';
    }

    // If sleep duration < 4h, brew a very strong coffee
    if (sleeplog.duration < 14400000) {
        var coffeeBeanAmount = 'ConsumerProducts.CoffeeMaker.EnumType.BeanAmount.VeryStrong';
    }

    // Sebd dato to bsh controller
    sendData(coffeeBeanAmount);

};

// Send data #BSH
function sendData (coffeeBeanAmount) {

    // Start coffeemaker
    bsh.startCoffeemaker(coffeeBeanAmount);

};