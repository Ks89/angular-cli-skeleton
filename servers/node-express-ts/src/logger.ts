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

import * as config from './config';
import { existsSync, mkdirSync } from 'fs';
import { join } from 'path';

import winston from 'winston';
import { Logger } from 'winston';
// winston.emitErrs = true;

const logsDir: string = join(__dirname, config.LOG_FOLDER);
console.log('logsDir', logsDir);

if (!existsSync(logsDir)) {
  // Create the logsDir directory if it does not exist
  mkdirSync(logsDir);
}

function getFormatter(options: any) {
  // Return string will be passed to logger.
  return (
    options.timestamp() +
    ' ' +
    options.level.toUpperCase() +
    ' ' +
    (undefined !== options.message ? options.message : '') +
    (options.meta && Object.keys(options.meta).length ? '\n\t' + JSON.stringify(options.meta) : '')
  );
}

export let logger = new Logger({
  transports: [
    new winston.transports.File({
      level: process.env.NODE_ENV === 'production' ? 'error' : 'debug',
      maxsize: 10000000,
      maxFiles: 2,
      filename: logsDir + '/log.log',
      handleExceptions: true,
      json: false,
      colorize: false,
      timestamp: () => Date.now(),
      formatter: (options: any) => getFormatter(options)
    }),
    new winston.transports.Console({
      level: 'debug',
      handleExceptions: true,
      json: true,
      colorize: true,
      timestamp: () => Date.now(),
      formatter: (options: any) => getFormatter(options)
    })
  ],
  exitOnError: false
});

export let stream = {
  write: (message: string) => {
    logger.info(message);
  }
};
