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

import { Router, NextFunction, Request, Response, Express } from 'express';

import RateLimit from 'express-rate-limit';
import SlowDown from 'express-slow-down';
import bodyParser from 'body-parser';

import { logger } from '../logger';
import * as config from '../config';
import * as APIS from './apis';

import * as ctrlAuth from './controllers/auth';
import * as ctrlKeepAlive from './controllers/keepalive';
import * as ctrlSecret from './controllers/secret';

logger.warn('[SECURITY] Initializing ratelimit');
// --SEC--- Brute Force Protection
// Brute forcing is the systematically enumerating of all possible candidates a solution and checking
// whether each candidate satisfies the problem's statement. In web applications a login endpoint
// can be the perfect candidate for this.
// To protect your applications from these kind of attacks you have to implement
// some kind of rate-limiting
// only if you're behind a reverse proxy (Heroku, Bluemix, AWS if you use an ELB, custom Nginx setup, etc)
// app.enable('trust proxy');
let apiLimiter: any = RateLimit(<RateLimit.Options>{
  windowMs: config.RATELIMITER_WINDOW_MS, // window in ms to check
  max: config.RATELIMITER_MAX, // limit each IP to `max` requests per windowMs
  message: config.RATELIMITER_MESSAGE // message to show with a HTTP 429 status
});
let apiSlowDown: any = SlowDown(<SlowDown.Options>{
  windowMs: config.RATELIMITER_WINDOW_MS, // window in ms to check
  delayAfter: config.RATELIMITER_DELAY_AFTER, // begin slowing down responses after `delayAfter` requests
  delayMs: config.RATELIMITER_DELAY_MS // slow down subsequent responses by `delayMs` seconds per request
});

if (config.isTest()) {
  apiLimiter = (req: Request, res: Response, next: NextFunction) => next();
  apiSlowDown = (req: Request, res: Response, next: NextFunction) => next();
}

export function getApis(express: any, passport: any): Router {
  const router: Router = Router();

  // -----------------------------------------------------------------------------------------
  // ----------------------------------------public-------------------------------------------
  // -----------------------------------------------------------------------------------------
  // auth login
  router.post(APIS.POST_LOGIN, [bodyParser.json(), apiLimiter, apiSlowDown, ctrlAuth.login]);
  // keep alive
  router.get(APIS.GET_KEEP_ALIVE, [apiLimiter, apiSlowDown, ctrlKeepAlive.keepAlive]);
  // -----------------------------------------------------------------------------------------
  // ------------------------------------authenticated----------------------------------------
  // -----------------------------------------------------------------------------------------
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

  return router;
}
