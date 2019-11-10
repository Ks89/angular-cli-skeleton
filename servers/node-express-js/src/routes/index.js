// MIT License
//
// Copyright (c) 2017-2019 Stefano Cappa
//
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:
//
// The above copyright notice and this permission notice shall be included in all
// copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
// SOFTWARE.

'use strict';

const RateLimit = require('express-rate-limit');
const SlowDown = require('express-slow-down');

const bodyParser = require('body-parser');
const logger = require('../logger');
const config = require('../config');

const APIS = require('./apis');

const ctrlAuth = require('./controllers/auth');
const ctrlKeepAlive = require('./controllers/keepalive');
const ctrlSecret = require('./controllers/secret');

logger.warn('[SECURITY] Initializing ratelimit');
// --SEC--- Brute Force Protection
// Brute forcing is the systematically enumerating of all possible candidates a solution and checking
// whether each candidate satisfies the problem's statement. In web applications a login endpoint
// can be the perfect candidate for this.
// To protect your applications from these kind of attacks you have to implement
// some kind of rate-limiting
// only if you're behind a reverse proxy (Heroku, Bluemix, AWS if you use an ELB, custom Nginx setup, etc)
// app.enable('trust proxy');
let apiLimiter = new RateLimit({
  windowMs: config.RATELIMITER_WINDOW_MS, // window in ms to check
  max: config.RATELIMITER_MAX, // limit each IP to `max` requests per windowMs
  message: config.RATELIMITER_MESSAGE // message to show with a HTTP 429 status
});
let apiSlowDown = new SlowDown({
  windowMs: config.RATELIMITER_WINDOW_MS, // window in ms to check
  delayAfter: config.RATELIMITER_DELAY_AFTER, // begin slowing down responses after `delayAfter` requests
  delayMs: config.RATELIMITER_DELAY_MS // slow down subsequent responses by `delayMs` seconds per request
});

if (config.isTest()) {
  apiLimiter = (req, res, next) => next();
  apiSlowDown = (req, res, next) => next();
}

module.exports = function(express, passport) {
  const router = express.Router();

  //-----------------------------------------------------------------------------------------
  //----------------------------------------public-------------------------------------------
  //-----------------------------------------------------------------------------------------
  // auth login
  router.post(APIS.POST_LOGIN, [bodyParser.json(), apiLimiter, apiSlowDown, ctrlAuth.login]);
  // keep alive
  router.get(APIS.GET_KEEP_ALIVE, [apiLimiter, apiSlowDown, ctrlKeepAlive.keepAlive]);
  //-----------------------------------------------------------------------------------------
  //------------------------------------authenticated----------------------------------------
  //-----------------------------------------------------------------------------------------
  // secret
  router.get(APIS.GET_SECRET, [
    apiLimiter,
    apiSlowDown,
    passport.authenticate('jwt', {
      session: true
    }),
    ctrlSecret.secret
  ]);
  // auth logout
  router.get(APIS.GET_LOGOUT, [
    apiLimiter,
    apiSlowDown,
    passport.authenticate('jwt', {
      session: true
    }),
    ctrlAuth.logout
  ]);

  module.exports = router;
  return router;
};
