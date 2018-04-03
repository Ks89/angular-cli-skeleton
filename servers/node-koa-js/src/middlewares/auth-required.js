'use strict';

const { UnauthorizedError } = require('../utils/errors');

module.exports = function(ctx, next) {
  console.log('auth middleware', ctx.state);
  if (!ctx.state.jwt || !ctx.state.jwt.id) {
    ctx.throw(401, new UnauthorizedError());
  }
  return next();
};
