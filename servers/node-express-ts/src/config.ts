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

import { resolve } from 'path';
import { config } from 'dotenv';

// @ts-ignore
const notInCI: boolean = process.env.CI !== 'yes' && process.env.CI !== true;
console.log(`Use dotenv condition is: ${notInCI}, because I cannot use dotenv with CI, so I have to skip it`);

if (notInCI === true) {
  console.log('Initializing dotenv (requires .env/.env_prod file)');
  let dotenvName: string | undefined;
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

  const dotenvAbsolutePath: string = resolve(__dirname, '../' + dotenvName);

  const dotenv = require('dotenv').config({
    path: dotenvAbsolutePath
  });
  if (dotenv.error) {
    throw dotenv.error;
  }
  console.log(`dotenv parsed with NODE_ENV=${process.env.NODE_ENV}`, dotenv.parsed);
}

// ATTENTION!!!
// don't use here logger-winston because it requires config fully initialized

export let isProd = () => process.env.NODE_ENV === 'production';
export let isTest = () => process.env.NODE_ENV === 'test';
// @ts-ignore
export let isCI = () => process.env.CI === 'yes' || process.env.CI === true;

export const FRONT_END_PATH: string = process.env.FRONT_END_PATH || '../../../dist/client';

export const NODE_ENV: string = process.env.NODE_ENV || 'development';
export const CI: string = process.env.CI || 'yes';

export const PORT: string = process.env.PORT || process.env.NODE_ENV === 'production' ? '80' : '3000';

export const LOG_FOLDER: string = process.env.LOG_FOLDER;

// Jwt config for apis server <-> client
export const JWT_SECRET: string = process.env.JWT_SECRET;
export const SESSION_TIMEOUT_MS: string = process.env.SESSION_TIMEOUT_MS || '3600000';

export const COOKIE_SECRET: string = process.env.COOKIE_SECRET; // secret password for cookies

// re-assign all process.env variables to be used in this app and defined with dotenv to constants
// In this way I can see all variables defined with donenv and used in this app
// In CI I can't use dotenv => I provide default values for all these constants
export const LARGE_PAYLOAD_MESSAGE: string = process.env.LARGE_PAYLOAD_MESSAGE;
export const EXPRESS_SESSION_SECRET: string = process.env.EXPRESS_SESSION_SECRET;
export const HELMET_HIDE_POWERED_BY: string = process.env.HELMET_HIDE_POWERED_BY;
export const HELMET_REFERRER_POLICY: string = process.env.HELMET_REFERRER_POLICY;
export const HELMET_EXPECT_CT_REPORT_URI: string = process.env.HELMET_EXPECT_CT_REPORT_URI;

// rate limiter for all APIs
export const RATELIMITER_WINDOW_MS: number | string = process.env.RATELIMITER_WINDOW_MS;
export const RATELIMITER_MAX: number | string = process.env.RATELIMITER_MAX;
export const RATELIMITER_DELAY_AFTER: number | string = process.env.RATELIMITER_DELAY_AFTER;
export const RATELIMITER_DELAY_MS: number | string = process.env.RATELIMITER_DELAY_MS;
export const RATELIMITER_MESSAGE: string = process.env.RATELIMITER_MESSAGE;
