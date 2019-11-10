'use strict';

const { JWT_SECRET, SESSION_TIMEOUT_MS } = require('../config');
const jwt = require('jsonwebtoken');
const _ = require('lodash');

function generateJWTforUser(user = {}) {
  return jwt.sign(getJwtToSign(user), JWT_SECRET); // add also ..._SECRET, {expiresIn: '7d'}) without to add exp manually
}

function getJwtToSign(dataToAdd) {
  const expiry = new Date();
  expiry.setTime(expiry.getTime() + parseInt(SESSION_TIMEOUT_MS));
  return {
    // ATTENTION!!!
    // All these info are public
    // don't store private thing here because they
    // are visible by users in all browsers (local storage)
    id: dataToAdd.id,
    exp: parseFloat(expiry.getTime())
  };
}

exports.generateJWTforUser = generateJWTforUser;
