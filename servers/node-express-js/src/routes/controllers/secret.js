'use strict';

const logger = require('../../logger-winston');

module.exports.secret = (req, res) => {
  logger.debug('REST secret');
  res.json({ message: 'This is a secret message from an authenticated rest API' });
};
