// Add all the required packages
var logger = require('winston');
var config = require('./config');

// Set custom levels
logger.setLevels({
    error: 0,
    warn: 1,
    info: 2,
    debug: 3,
    silly: 4
});

// Set custom colors
logger.addColors({
    error: 'red',
    warn:  'yellow',
    info:  'green',
    debug: 'cyan',
    silly: 'magenta'
});

// Set custom log format
function customFileFormatter (options) {
    return logger.config.colorize(options.level, '[' + options.timestamp() +'] ['+ options.level.toUpperCase() +'] '+ (undefined !== options.message ? options.message : ''));
}

// Clean console transport (required)
logger.remove(logger.transports.Console);

// Add global logger
logger.add(logger.transports.Console, {
    level: config.logLevel,
    colorize:true,
    timestamp: function() {
        return new Date().toLocaleString();
    },
    formatter: customFileFormatter
});

module.exports = logger;