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

import * as _ from 'lodash';

export interface JwtPayload {
  id: number;
  exp: number;
  iat: number;
}

export class JwtInvalidDateError extends Error {}

export class Utils {
  constructor() {}

  static isJwtValidDate(decodedJwtToken: JwtPayload): boolean {
    if (!decodedJwtToken.hasOwnProperty('exp')) {
      throw new JwtInvalidDateError('Expire date not found');
    }

    // decodedJwtToken.exp is a Float that represents the exp date
    // it must be a float, and not a Date
    // NB: parseFloat returns NaN if it can't parse a value
    if (_.isDate(decodedJwtToken.exp) || _.isNaN(decodedJwtToken.exp)) {
      throw new JwtInvalidDateError('Not a float expiration date');
    }

    const convertedDate: Date = new Date();
    convertedDate.setTime(decodedJwtToken.exp);
    // console.log('date jwt: ' + convertedDate.getTime() +
    //  ', formatted: ' + this.getTextFormattedDate(convertedDate));
    // const systemDate = new Date();
    // console.log('systemDate: ' + systemDate.getTime() +
    //   ', formatted: ' + this.getTextFormattedDate(systemDate));
    // convertedDate > systemDate
    return convertedDate.getTime() > new Date().getTime();
  }
}
