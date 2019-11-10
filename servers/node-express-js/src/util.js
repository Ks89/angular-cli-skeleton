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

const _ = require('lodash');

class Utils {
  constructor() {}

  static isJwtValidDate(decodedJwtToken) {
    //isObject: JavaScript arrays and functions
    //          are objects, while (normal) strings and numbers are not.
    if (
      !decodedJwtToken ||
      !_.isObject(decodedJwtToken) ||
      _.isArray(decodedJwtToken) ||
      _isNotAcceptableValue(decodedJwtToken) ||
      _.isBoolean(decodedJwtToken)
    ) {
      throw 'Not a valid decodedJwtToken';
    }

    if (!decodedJwtToken.hasOwnProperty('exp')) {
      throw 'Expire date not found';
    }

    //decodedJwtToken.exp is a Float that represents the exp date
    //it must be a float, and not a Date
    //NB: parseFloat returns NaN if it can't parse a value
    if (_.isDate(decodedJwtToken.exp) || _.isNaN(parseFloat(decodedJwtToken.exp))) {
      throw 'Not a float expiration date';
    }

    let convertedDate = new Date();
    convertedDate.setTime(decodedJwtToken.exp);
    // console.log('date jwt: ' + convertedDate.getTime() +
    //  ', formatted: ' + this.getTextFormattedDate(convertedDate));
    // const systemDate = new Date();
    // console.log('systemDate: ' + systemDate.getTime() +
    //   ', formatted: ' + this.getTextFormattedDate(systemDate));
    // convertedDate > systemDate
    return convertedDate.getTime() > new Date().getTime();
  }

  // This method returns true if the parameter is NOT acceptable, i.e.
  // is a function OR
  // is _isNotValidJavascriptObject OR
  // is null OR
  // is undefined OR
  // is NaN;
  // false otherwise.
  static isNotAcceptableValue(param) {
    return _isNotAcceptableValue(param);
  }

  static isAcceptableValue(param) {
    return _isAcceptableValue(param);
  }

  // Returns true if the parameter is NOT a valid Javascript
  //    Object for this application, i.e.
  // is ArrayBuffer OR
  // is Buffer OR
  // is Uint8Array OR
  // is Error OR
  // is Map OR
  // is WeakMap OR
  // is Set OR
  // is WeakSet OR
  // is Symbol OR
  // is RegExp OR
  // false otherwise.
  static isNotValidJavascriptObject(param) {
    return _isNotValidJavascriptObject(param);
  }

  static isNotValidArray(param) {
    return _isNotValidArray(param);
  }

  static isSet(param) {
    return _isSet(param);
  }

  static isMap(param) {
    return _isMap(param);
  }
}

// ---------- private functions that I can call inside this class ----------
// Also, I exposed some of these functions using static methods (without `_`)
function _isNotAcceptableValue(param) {
  return _.isFunction(param) || _isNotValidJavascriptObject(param) || _.isNil(param) || _.isNaN(param);
}

function _isAcceptableValue(param) {
  return !_isNotAcceptableValue(param);
}

function _isNotValidJavascriptObject(p) {
  return _.isBuffer(p) || _.isError(p) || _.isRegExp(p) || _.isSymbol(p) || _isSet(p) || _isMap(p) || _isNotValidArray(p);
}

function _isNotValidArray(p) {
  return _.isArrayBuffer(p) || _.isTypedArray(p);
}

function _isSet(p) {
  return _.isSet(p) || _.isWeakSet(p);
}

function _isMap(p) {
  return _.isMap(p) || _.isWeakMap(p);
}

module.exports = Utils;
