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

const config = require('./config');
const fs = require('fs');
const { inspect } = require('util');
const { format, createLogger, transports, addColors } = require('winston');

require('winston-daily-rotate-file');

const logsDir = config.LOG_FOLDER;

if (!fs.existsSync(logsDir)) {
  // Create the logsDir directory if it does not exist
  fs.mkdirSync(logsDir);
}

const configLevels = {
  levels: {
    error: 0,
    debug: 1,
    warn: 2,
    data: 3,
    info: 4,
    verbose: 5,
    silly: 6
  },
  colors: {
    error: 'red',
    debug: 'green',
    warn: 'yellow',
    data: 'grey',
    info: 'white',
    verbose: 'cyan',
    silly: 'magenta'
  }
};

addColors(configLevels.colors);

const logger = createLogger({
  levels: configLevels.levels,
  format: format.combine(
    format.timestamp({
      format: 'YYYY-MM-DD HH:mm:ss'
    }),
    format.printf(info => printfBuildMessage(info))
  ),
  transports: [
    new transports.DailyRotateFile({
      filename: logsDir + '/ks-errors-%DATE%.log',
      datePattern: 'YYYY-MM-DD',
      zippedArchive: false,
      maxSize: '50m',
      maxFiles: '20',
      level: 'error',
      handleExceptions: true
    }),
    new transports.DailyRotateFile({
      filename: logsDir + '/ks-warnings-%DATE%.log',
      datePattern: 'YYYY-MM-DD',
      zippedArchive: false,
      maxSize: '50m',
      maxFiles: '20',
      level: 'warn',
      handleExceptions: true
    }),
    new transports.DailyRotateFile({
      filename: logsDir + '/ks-%DATE%.log',
      datePattern: 'YYYY-MM-DD',
      zippedArchive: false,
      maxSize: '50m',
      maxFiles: '20',
      handleExceptions: true
    })
  ],
  level: !process.env.NODE_ENV ? 'silly' : 'error',
  exitOnError: false
});

if (process.env.NODE_ENV !== 'production') {
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

module.exports = logger;

function printfBuildMessage(info) {
  let obj = Object.assign({}, info);
  delete obj.message;
  delete obj.level;
  delete obj.splat;
  delete obj.timestamp;

  let newObj = {};

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
