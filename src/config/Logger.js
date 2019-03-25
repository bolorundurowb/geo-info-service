/**
 * Created by bolorundurowb on 2019-03-25
 */

const winston = require('winston');

const tsFormat = function () {
  return (new Date()).toLocaleTimeString();
};

const alignedWithColorsAndTime = winston.format.combine(
  winston.format.colorize(),
  winston.format.timestamp(),
  winston.format.align(),
  winston.format.printf(info => `${info.timestamp} [${info.level}]: ${info.message}`),
);

const logger = winston.createLogger({
  transports: [
    new winston.transports.Console({
      level: 'debug',
      handleExceptions: true,
      colorize: true,
      timestamp: tsFormat,
      json: false,
      format: alignedWithColorsAndTime
    })
  ],
  exitOnError: false
});

class Logger {
  static log(message) {
    logger.level = 'info';
    logger.info(message);
  }

  static error(err) {
    logger.level = 'error';
    logger.error(`\n\n${err}`);
  }
}

module.exports = Logger;
