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
const { inspect } = require('util');

import { format, createLogger, transports, addColors } from 'winston';

const DailyRotateFile = require('winston-daily-rotate-file');

const logsDir: string = join(__dirname, config.LOG_FOLDER);
console.log('logsDir', logsDir);

if (!existsSync(logsDir)) {
  // Create the logsDir directory if it does not exist
  mkdirSync(logsDir);
}

// Ignore log messages if the have { private: true }
const ignorePrivate = format(info => {
  if (info.private) {
    return false;
  }
  return info;
});

const configLevels = {
  levels: {
    error: 0,
    debug: 1,
    warn: 2,
    data: 3,
    info: 4,
    verbose: 5,
    silly: 6,
    custom: 7
  },
  colors: {
    error: 'red',
    debug: 'green',
    warn: 'yellow',
    data: 'grey',
    info: 'white',
    verbose: 'cyan',
    silly: 'magenta',
    custom: 'yellow'
  }
};

addColors(configLevels.colors);

export let logger = createLogger({
  levels: configLevels.levels,
  format: format.combine(
    ignorePrivate(),
    format.timestamp({
      format: 'YYYY-MM-DD HH:mm:ss'
    }),
    format.printf(info => printfBuildMessage(info))
  ),
  transports: [
    new DailyRotateFile({
      filename: logsDir + '/log-errors-%DATE%.log',
      datePattern: 'YYYY-MM-DD',
      zippedArchive: false,
      maxSize: '2m',
      maxFiles: '20',
      level: 'error',
      handleExceptions: true
    }),
    new DailyRotateFile({
      filename: logsDir + '/bridge-%DATE%.log',
      datePattern: 'YYYY-MM-DD',
      zippedArchive: false,
      maxSize: '2m',
      maxFiles: '20',
      handleExceptions: true
    })
  ],
  level: process.env.NODE_ENV === 'production' ? 'error' : 'silly',
  exitOnError: false
});

if (!config.isProd() && !config.isCI()) {
  logger.add(
    new transports.Console({
      handleExceptions: true,
      format: format.combine(
        format.colorize({
          all: true
        }),
        format.printf(info => printfBuildMessage(info))
      )
    })
  );
}

function printfBuildMessage(info: any) {
  const obj: any = Object.assign({}, info);
  delete obj.message;
  delete obj.level;
  delete obj.splat;
  delete obj.timestamp;
  const newObj: any = {};
  Object.keys(obj).forEach(key => {
    if (typeof obj[key] !== 'symbol') {
      newObj[key] = obj[key];
    }
  });
  const stringified = JSON.stringify(
    inspect(newObj, {
      showHidden: false,
      depth: 10
    })
  )
    .replace(/\\n/g, ' ')
    .replace(/ +(?= )/g, ' ');
  return `${info.timestamp} ${info.level} - ${info.message}: ${stringified}`;
}
