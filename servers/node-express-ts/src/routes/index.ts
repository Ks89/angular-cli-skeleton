'use strict';

import { Express, Router } from 'express';

import RateLimit from 'express-rate-limit';
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
const apiLimiter = new RateLimit(<RateLimit.Options>{
  windowMs: config.RATELIMITER_WINDOW_MS, // window in ms to check
  max: config.RATELIMITER_MAX, // limit each IP to `max` requests per windowMs
  delayAfter: config.RATELIMITER_DELAY_AFTER, // begin slowing down responses after `delayAfter` requests
  delayMs: config.RATELIMITER_DELAY_MS, // slow down subsequent responses by `delayMs` seconds per request
  message: config.RATELIMITER_MESSAGE // message to show with a HTTP 429 status
});

export function getApis(express: any, passport: any): Router {
  const router: Router = Router();

  // -----------------------------------------------------------------------------------------
  // ----------------------------------------public-------------------------------------------
  // -----------------------------------------------------------------------------------------
  // auth login
  router.post(APIS.POST_LOGIN, [bodyParser.json(), apiLimiter, ctrlAuth.login]);
  // keep alive
  router.get(APIS.GET_KEEP_ALIVE, [apiLimiter, ctrlKeepAlive.keepAlive]);
  // -----------------------------------------------------------------------------------------
  // ------------------------------------authenticated----------------------------------------
  // -----------------------------------------------------------------------------------------
  // secret
  router.get(APIS.GET_SECRET, [
    apiLimiter,
    passport.authenticate('jwt', {
      session: true
    }),
    ctrlSecret.secret
  ]);
  // auth logout
  router.get(APIS.GET_LOGOUT, [
    apiLimiter,
    passport.authenticate('jwt', {
      session: true
    }),
    ctrlAuth.logout
  ]);

  return router;
}
