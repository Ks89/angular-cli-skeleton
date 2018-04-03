'use strict';

const Router = require('koa-router');
const ctrl = require('./controllers').auth;
const router = new Router();

const APIS = require('./apis');

const auth = require('../middlewares/auth-required');

router.post(APIS.POST_LOGIN, ctrl.login);

router.get(APIS.GET_LOGOUT, auth, ctrl.logout);

module.exports = router.routes();
