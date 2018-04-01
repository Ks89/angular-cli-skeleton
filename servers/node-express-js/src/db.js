'use strict';

const db = require('./db.json');

// Don't use a const here!
// this is a private variable.
// To access to 'tokens' use get, set and remove to prevent issues
let tokens = [];

function getTokens() {
  return tokens;
}

function setTokens(newTokens) {
  tokens = newTokens;
}

function removeTokens() {
  tokens = [];
}

module.exports = {
  getTokens: getTokens,
  setTokens: setTokens,
  removeTokens: removeTokens,
  db: db
};
