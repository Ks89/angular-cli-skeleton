'use strict';

const Router = require('koa-router');
const ctrl = require('./controllers').secret;
const router = new Router();

const APIS = require('./apis');

const auth = require('../middlewares/auth-required');

router.get(APIS.GET_SECRET, auth, ctrl.getSecret);

module.exports = router.routes();
