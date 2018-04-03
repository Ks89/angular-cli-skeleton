'use strict';

module.exports = {
  async keepAlive(ctx) {
    ctx.body = { message: 'Koa is up!' };
  }
};
