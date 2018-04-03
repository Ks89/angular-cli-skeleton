'use strict';

const Router = require('koa-router');
const ctrl = require('./controllers').keepAlive;
const router = new Router();

const APIS = require('./apis');

router.get(APIS.GET_KEEP_ALIVE, ctrl.keepAlive);

module.exports = router.routes();
