// MIT License
//
// Copyright (c) 2017-2018 Stefano Cappa
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

// ATTENTION!!!
// don't use here logger-winston because it requires config fully initialized

export let isCI = () => process.env.CI === 'yes';
export let isProd = () => process.env.NODE_ENV === 'production';
export let isTest = () => process.env.NODE_ENV === 'test';

// used to run this server as back-end for integration testing on client-side
// this method isn't used for integration testing on server-side
export let isForE2eTest = () => process.env.NODE_ENV === 'e2e';

export const FRONT_END_PATH: string = process.env.FRONT_END_PATH || '../../../dist/browser';

export const NODE_ENV: string = process.env.NODE_ENV || 'development';
export const CI: string = process.env.CI || 'yes';
export const PORT: string = process.env.PORT || process.env.NODE_ENV === 'production' ? '80' : '3000';

export const LOG_PATH: string = process.env.LOG_PATH || process.env.NODE_ENV === 'production' ? 'nodeserver.log' : 'nodeserver.log';

// Jwt config for apis server <-> client
export const JWT_SECRET: string = process.env.JWT_SECRET || 'secret key bla bla';
export const SESSION_TIMEOUT_MS: number | string = process.env.SESSION_TIMEOUT_MS || 3600000; // by default valid for 8 hours

// re-assign all process.env variables to be used in this app and defined with dotenv to constants
// In this way I can see all variables defined with donenv and used in this app
// In CI I can't use dotenv => I provide default values for all these constants
export const LARGE_PAYLOAD_MESSAGE: string = process.env.LARGE_PAYLOAD_MESSAGE || 'payload too large!';
export const EXPRESS_SESSION_SECRET: string = process.env.EXPRESS_SESSION_SECRET || 'keyboard cat';
export const HELMET_HIDE_POWERED_BY: string = process.env.HELMET_HIDE_POWERED_BY || 'ks89';
export const HELMET_REFERRER_POLICY: string = process.env.HELMET_REFERRER_POLICY || 'no-referrer';
export const HELMET_EXPECT_CT_REPORT_URI: string = process.env.HELMET_EXPECT_CT_REPORT_URI || 'https =//angularcliexample.com/expect-ct-report';

// rate limiter for all APIs
export const RATELIMITER_WINDOW_MS: number | string = process.env.RATELIMITER_WINDOW_MS || 60 * 60 * 1000; // by default 15 minutes
export const RATELIMITER_MAX: number | string = process.env.RATELIMITER_MAX || 1000;
export const RATELIMITER_DELAY_AFTER: number | string = process.env.RATELIMITER_DELAY_AFTER || 800;
export const RATELIMITER_DELAY_MS: number | string = process.env.RATELIMITER_DELAY_MS || 3 * 1000; // by default 3 seconds
export const RATELIMITER_MESSAGE: string = process.env.RATELIMITER_MESSAGE || 'Too many requests from this IP, please try again after 60 minutes';
