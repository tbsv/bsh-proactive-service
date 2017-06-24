// Add all the required packages
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var nedb = require('./controller/nedbController');
var winston = require('winston');
var cronjob = require('cron').CronJob;
var trigger = require('./controller/triggerController');

// Load global logging
var log = require('./config/log');

// Add routes for REST API
var index = require('./routes/index');
var bsh = require('./routes/bsh');
var fitbit = require('./routes/fitbit');

// Set express engine
var app = express();

// Set view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Define routes
app.use('/', index);
app.use('/bsh', bsh);
app.use('/fitbit', fitbit);

log.info('Initializing proactive service...');

// Catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

log.debug('Initializing cronjob with 10 seconds...');

// Start the cron job
new cronjob('*/10 * * * * *', function() {

    // Fetch new data
    trigger.fetchData();

}, null, true, 'Europe/Berlin');

// Error Handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
