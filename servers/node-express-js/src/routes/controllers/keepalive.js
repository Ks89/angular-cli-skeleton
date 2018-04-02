'use strict';

const logger = require('../../logger');

module.exports.keepAlive = (req, res) => {
  logger.debug('REST keepAlive');

  res.json({ message: 'Express is up!' });
};
