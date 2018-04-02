'use strict';

// ATTENTION!!!
// don't use here logger.js because it requires config fully initialized

module.exports = {
  isCI: () => process.env.CI === 'yes' || process.env.CI === true,
  isProd: () => process.env.NODE_ENV === 'production',
  isTest: () => process.env.NODE_ENV === 'test',

  // used to run this server as back-end for integration testing on client-side
  // this method isn't used for integration testing on server-side
  isForE2eTest: () => process.env.NODE_ENV === 'e2e',

  FRONT_END_PATH: process.env.FRONT_END_PATH || '../../dist/browser',

  NODE_ENV: process.env.NODE_ENV || 'development',
  CI: process.env.CI || 'yes',
  PORT: process.env.PORT || process.env.NODE_ENV === 'production' ? 80 : 3000,

  LOG_PATH: process.env.LOG_PATH || process.env.NODE_ENV === 'production' ? 'nodeserver.log' : 'nodeserver.log',

  // Jwt config for apis server <-> client
  JWT_SECRET: process.env.JWT_SECRET || 'secret key bla bla',
  SESSION_TIMEOUT_MS: process.env.SESSION_TIMEOUT_MS || 3600000, // by default valid for 8 hours

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
