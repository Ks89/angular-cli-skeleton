'use strict';

const secret = require('./secret');
const keepAlive = require('./keepAlive');
const auth = require('./auth');

module.exports = {
  secret,
  keepAlive,
  auth
};
