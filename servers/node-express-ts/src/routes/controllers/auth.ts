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

import { Request, Response } from 'express';

import * as jwt from 'jsonwebtoken';
import * as _ from 'lodash';

import { logger } from '../../logger';
import * as config from '../../config';
import { db, Db, Token, setTokens, getTokens, removeTokens } from '../../db';
import * as passportConfig from '../../passport';
import { StrategyOptions } from 'passport-jwt';

const jwtOptions: StrategyOptions = passportConfig.getJwtOptions();

/**
 * @api {post} /api/login Login as user.
 * @apiVersion 1.0.0
 * @apiName Login
 * @apiGroup Auth
 * @apiPermission none
 *
 * @apiDescription Login as user.
 *
 * @apiParam {String} username User username
 * @apiParam {String} password User password.
 *
 * @apiHeaderExample {json} Header-Example: {"Content-Type": "application/json","XSRF-TOKEN": "A VALID TOKEN"}
 *
 * @apiSuccess {String} token Text with the jwt token.
 *
 * @apiError ParamsError 400 All fields required.
 * @apiError NotAuthError 401 Incorrect username or password.
 * @apiError UserNotEnabledError 401 Incorrect username or password.
 *
 * @apiParamExample {json} Request-Example:
 *     {
 *       "username": "admin",
 *       "password": "password"
 *     }
 *
 * @apiSuccessExample {json} Success-Response:
 *   HTTP/1.1 200 OK
 *   {
 *     "token":"JWT TOKEN"
 *   }
 */

export function login(req: Request, res: Response) {
  logger.debug('REST auth login - logging in');

  if (!req.body.username || !req.body.password) {
    logger.error('REST auth login - missing params', req.body);
    return res.status(400).send({
      message: 'all input parameters are mandatory'
    });
  }

  const username = req.body.username;
  const password = req.body.password;

  // usually this would be a database call:
  const user: Db = db[_.findIndex(db, (o: Db) => o && o.credential && o.credential.username === username && o.credential.password === password)];

  if (!user || !user.credential) {
    logger.error('REST auth login - cannot get credential object from db');
    return res.status(401).json({
      message: 'Incorrect username or password'
    });
  }

  if (user.credential.password !== password) {
    logger.error('REST auth login - Incorrect username or password');
    return res.status(401).json({
      message: 'Incorrect username or password'
    });
  }

  // from now on we'll identify the user by the id and the id
  // is the only personalized value that goes into our token
  const payload = { id: user.credential.id };
  console.log('payload', payload);

  const token = jwt.sign(getJwtToSign(payload), jwtOptions.secretOrKey);
  console.log('token', token);

  const indexLoggedUser: number = getTokens().findIndex((o: Token) => o && (o.token === token || o.userId === user.credential.id));

  if (indexLoggedUser !== -1) {
    removeTokens();
  }

  setTokens(
    getTokens().concat(<Token>{
      token: token,
      userId: user.credential.id
    })
  );

  res.status(200).json({
    token: token
  });
}

/**
 * @api {get} /api/logout Logout user.
 * @apiVersion 1.0.0
 * @apiName Logout
 * @apiGroup Auth
 * @apiPermission authenticate
 *
 * @apiDescription Logout.
 *
 * @apiSuccess {String} message Constant text 'Logout successfull'.
 *
 * @apiHeaderExample {json} Header-Example: {"Content-Type": "application/json","Authorization": "Bearer A_VALID_JWT_TOKEN", "XSRF-TOKEN": "A VALID TOKEN"}
 *
 * @apiErrorExample {text} Error-Response:
 *   HTTP/1.1 401 ANAUTHORIZED
 *
 *   Unauthorized
 */
export function logout(req: Request, res: Response) {
  logger.debug('REST auth logout - logging out');

  const currentToken = (<string>req.headers.authorization).replace('Bearer ', '');
  const currentUser = (<any>req).user;
  setTokens(getTokens().filter(o => o && currentToken && currentUser && o.token !== currentToken && o.userId !== currentUser.id));

  res.status(200).json({
    message: 'Logout successfull'
  });
}

function getJwtToSign(dataToAdd: any) {
  const expiry: Date = new Date();
  expiry.setTime(<number>expiry.getTime() + parseInt(<string>config.SESSION_TIMEOUT_MS));
  return {
    // ATTENTION!!!
    // All these info are public
    // don't store private thing here because they
    // are visible by users in all browsers (local storage)
    id: dataToAdd.id,
    exp: +(<number>expiry.getTime())
  };
}
