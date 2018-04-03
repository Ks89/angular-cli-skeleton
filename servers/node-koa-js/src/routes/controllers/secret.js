'use strict';

module.exports = {
  async getSecret(ctx) {
    ctx.body = { message: 'This is a secret message from an authenticated rest API' };
  }
};
