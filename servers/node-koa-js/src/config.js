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

const path = require('path');

const notInCI = process.env.CI !== 'yes' && process.env.CI !== true;
console.log(`Use dotenv condition is: ${notInCI}, because I cannot use dotenv with CI, so I have to skip it`);

if (notInCI === true) {
  console.log('Initializing dotenv (requires .env/.env_prod file)');
  let dotenvName = null;
  switch (process.env.NODE_ENV) {
    case 'development':
      console.log('dotenv read: .env');
      dotenvName = '.env';
      break;
    case 'test':
      console.log('dotenv read: .env (you are running with NODE_ENV=test)');
      dotenvName = '.env';
      break;
    default:
    case 'production':
      console.log('dotenv read: .env_prod');
      dotenvName = '.env_prod';
      break;
  }

  const dotenvAbsolutePath = path.join(__dirname, '../' + dotenvName);

  const dotenv = require('dotenv').config({
    path: dotenvAbsolutePath
  });
  if (dotenv.error) {
    throw dotenv.error;
  }
  console.log(`dotenv parsed with NODE_ENV=${process.env.NODE_ENV}`, dotenv.parsed);
}

// ATTENTION!!!
// don't use here logger.js because it requires config fully initialized

module.exports = {
  isProd: () => process.env.NODE_ENV === 'production',
  isTest: () => process.env.NODE_ENV === 'test',
  isCI: () => process.env.CI === 'yes' || process.env.CI === true,

  NODE_ENV: process.env.NODE_ENV || 'development',
  CI: process.env.CI || 'yes',

  FRONT_END_PATH: process.env.FRONT_END_PATH,
  PORT: process.env.PORT || process.env.NODE_ENV === 'production' ? 80 : 3000,

  LOG_FOLDER: process.env.LOG_FOLDER,

  // Jwt config for apis server <-> client
  JWT_SECRET: process.env.JWT_SECRET,
  SESSION_TIMEOUT_MS: process.env.SESSION_TIMEOUT_MS, // by default valid for 8 hours

  COOKIE_SECRET: process.env.COOKIE_SECRET, // secret password for cookies

  // re-assign all process.env variables to be used in this app and defined with dotenv to constants
  // In this way I can see all variables defined with donenv and used in this app
  // In CI I can't use dotenv => I provide default values for all these constants
  LARGE_PAYLOAD_MESSAGE: process.env.LARGE_PAYLOAD_MESSAGE,
  EXPRESS_SESSION_SECRET: process.env.EXPRESS_SESSION_SECRET,
  HELMET_HIDE_POWERED_BY: process.env.HELMET_HIDE_POWERED_BY,
  HELMET_REFERRER_POLICY: process.env.HELMET_REFERRER_POLICY,
  HELMET_EXPECT_CT_REPORT_URI: process.env.HELMET_EXPECT_CT_REPORT_URI,

  // rate limiter for all APIs
  RATELIMITER_WINDOW_MS: process.env.RATELIMITER_WINDOW_MS,
  RATELIMITER_MAX: process.env.RATELIMITER_MAX,
  RATELIMITER_DELAY_AFTER: process.env.RATELIMITER_DELAY_AFTER,
  RATELIMITER_DELAY_MS: process.env.RATELIMITER_DELAY_MS,
  RATELIMITER_MESSAGE: process.env.RATELIMITER_MESSAGE
};
