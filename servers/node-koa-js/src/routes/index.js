'use strict';

const Router = require('koa-router');
const router = new Router();
const api = new Router();

const APIS = require('./apis');
const keepAlive = require('./keepAlive-router');
const secret = require('./secret-router');
const auth = require('./auth-router');

api.use(keepAlive);
api.use(secret);
api.use(auth);

router.use(APIS.BASE_API_PATH, api.routes());

module.exports = router;
