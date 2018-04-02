'use strict';

const config = require('./config');

let jwtOpts;

module.exports.buildJwtOptions = jwtFromRequest => {
  jwtOpts = {};
  jwtOpts.jwtFromRequest = jwtFromRequest;
  jwtOpts.secretOrKey = config.JWT_SECRET;
  return jwtOpts;
};

module.exports.getJwtOptions = () => {
  return jwtOpts;
};
