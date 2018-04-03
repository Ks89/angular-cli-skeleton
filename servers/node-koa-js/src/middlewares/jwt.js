const koaJwt = require('koa-jwt');
const { JWT_SECRET } = require('../config');

module.exports = koaJwt({
  getToken(ctx, opts) {
    const { authorization } = ctx.header;

    if (authorization && authorization.split(' ')[0] === 'Bearer') {
      return authorization.split(' ')[1];
    }

    if (authorization && authorization.split(' ')[0] === 'Token') {
      return authorization.split(' ')[1];
    }

    return null;
  },
  secret: JWT_SECRET,
  passthrough: true,
  key: 'jwt'
});
