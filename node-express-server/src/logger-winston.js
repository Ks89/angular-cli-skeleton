'use strict';

const config = require('./config');

let winston = require('winston');
winston.emitErrs = true;

function getFormatter(options) {
  // Return string will be passed to logger.
  return (
    options.timestamp() +
    ' ' +
    options.level.toUpperCase() +
    ' ' +
    (undefined !== options.message ? options.message : '') +
    (options.meta && Object.keys(options.meta).length ? '\n\t' + JSON.stringify(options.meta) : '')
  );
}

let logger = new winston.Logger({
  transports: [
    new winston.transports.File({
      level: process.env.NODE_ENV === 'production' ? 'error' : 'debug',
      maxsize: 10000000,
      maxFiles: 2,
      filename: config.LOG_PATH,
      handleExceptions: true,
      json: false,
      colorize: false,
      timestamp: () => Date.now(),
      formatter: options => getFormatter(options)
    }),
    new winston.transports.Console({
      level: 'debug',
      handleExceptions: true,
      json: true,
      colorize: true,
      timestamp: () => Date.now(),
      formatter: options => getFormatter(options)
    })
  ],
  exitOnError: false
});

module.exports = logger;

module.exports.stream = {
  write: message => {
    logger.info(message);
  }
};
