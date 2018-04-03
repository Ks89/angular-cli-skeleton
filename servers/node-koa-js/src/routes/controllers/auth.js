'use strict';

const _ = require('lodash');

const { UnauthorizedError } = require('../../utils/errors');
const { generateJWTforUser } = require('../../utils/jwt');
const db = require('../../db');

module.exports = {
  async login(ctx) {
    const { body } = ctx.request;

    console.log('body', body);

    if (!_.isObject(body) || !body.username || !body.password) {
      console.error('Username or password not valid');
      ctx.throw(401, new UnauthorizedError());
    }

    const username = body.username;
    const password = body.password;

    // usually this would be a database call:
    let user = db.db[_.findIndex(db.db, o => o && o.credential && o.credential.username === username && o.credential.password === password)];

    if (!user || !user.credential) {
      console.error('User not found');
      ctx.throw(401, new UnauthorizedError());
    }

    if (user.credential.password !== password) {
      console.error('Wrong password');
      ctx.throw(401, new UnauthorizedError());
    }

    const token = generateJWTforUser(user.credential);

    console.log('token', token);

    ctx.body = { token: token };
  },

  async logout(ctx) {
    ctx.state.jwt = undefined;
    // ctx.body = {message: 'Logout successfull'};
  }
};
