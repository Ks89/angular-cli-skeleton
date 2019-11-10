'use strict';

// ATTENTION!!!
// don't use here logger.js because it requires config fully initialized

module.exports = {
  isProd: () => process.env.NODE_ENV === 'production',
  isTest: () => process.env.NODE_ENV === 'test',

  FRONT_END_PATH: process.env.FRONT_END_PATH || '../../dist/client',

  NODE_ENV: process.env.NODE_ENV || 'development',
  PORT: process.env.PORT || process.env.NODE_ENV === 'production' ? 80 : 3000,

  LOG_FOLDER: process.env.LOG_FOLDER || 'logs',

  // Jwt config for apis server <-> client
  JWT_SECRET: process.env.JWT_SECRET || 'secret key bla bla',
  SESSION_TIMEOUT_MS: process.env.SESSION_TIMEOUT_MS || 3600000, // by default valid for 8 hours

  COOKIE_SECRET: process.env.COOKIE_SECRET, // secret password for cookies

  // re-assign all process.env variables to be used in this app and defined with dotenv to constants
  // In this way I can see all variables defined with donenv and used in this app
  // In CI I can't use dotenv => I provide default values for all these constants
  LARGE_PAYLOAD_MESSAGE: process.env.LARGE_PAYLOAD_MESSAGE || 'payload too large!',
  EXPRESS_SESSION_SECRET: process.env.EXPRESS_SESSION_SECRET || 'keyboard cat',
  HELMET_HIDE_POWERED_BY: process.env.HELMET_HIDE_POWERED_BY || 'ks89',
  HELMET_REFERRER_POLICY: process.env.HELMET_REFERRER_POLICY || 'no-referrer',
  HELMET_EXPECT_CT_REPORT_URI: process.env.HELMET_EXPECT_CT_REPORT_URI || 'https://angularcliexample.com/expect-ct-report',

  // rate limiter for all APIs
  RATELIMITER_WINDOW_MS: process.env.RATELIMITER_WINDOW_MS || 60 * 60 * 1000, // by default 15 minutes
  RATELIMITER_MAX: process.env.RATELIMITER_MAX || 1000,
  RATELIMITER_DELAY_AFTER: process.env.RATELIMITER_DELAY_AFTER || 800,
  RATELIMITER_DELAY_MS: process.env.RATELIMITER_DELAY_MS || 3 * 1000, // by default 3 seconds
  RATELIMITER_MESSAGE: process.env.RATELIMITER_MESSAGE || 'Too many requests from this IP, please try again after 60 minutes'
};
