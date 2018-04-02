'use strict';

const jwt = require('jsonwebtoken');
const _ = require('lodash');

const logger = require('../../logger');
const config = require('../../config');
const db = require('../../db');
const passportConfig = require('../../passport');

const jwtOptions = passportConfig.getJwtOptions();

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
 * @apiHeaderExample {json} Header-Example:
 *     {
 *       "Content-Type": "application/json",
 *				"XSRF-TOKEN": "A VALID TOKEN"
 *     }
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

module.exports.login = (req, res) => {
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
  let user = db.db[_.findIndex(db.db, o => o && o.credential && o.credential.username === username && o.credential.password === password)];

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

  let indexLoggedUser = db.getTokens().findIndex(o => o && (o.token === token || o.userId === user.credential.id));

  if (indexLoggedUser !== -1) {
    db.removeTokens();
  }

  db.setTokens(
    db.getTokens().concat({
      token: token,
      userId: user.credential.id
    })
  );

  res.status(200).json({
    token: token
  });
};

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
 * @apiHeaderExample {json} Header-Example:
 *     {
 *       "Content-Type": "application/json",
 *       "Authorization": "Bearer A_VALID_JWT_TOKEN"
 *			 "XSRF-TOKEN": "A VALID TOKEN"
 *     }
 *
 * @apiErrorExample {text} Error-Response:
 *   HTTP/1.1 401 ANAUTHORIZED
 *
 *   Unauthorized
 */
module.exports.logout = (req, res) => {
  logger.debug('REST auth logout - logging out');

  const currentToken = req.headers.authorization.replace('Bearer ', '');
  const currentUser = req.user;
  db.setTokens(db.getTokens().filter(o => o && currentToken && currentUser && o.token !== currentToken && o.userId !== currentUser.id));

  res.status(200).json({
    message: 'Logout successfull'
  });
};

function getJwtToSign(dataToAdd) {
  const expiry = new Date();
  expiry.setTime(expiry.getTime() + config.SESSION_TIMEOUT_MS);
  return {
    // ATTENTION!!!
    // All these info are public
    // don't store private thing here because they
    // are visible by users in all browsers (local storage)
    id: dataToAdd.id,
    exp: parseFloat(expiry.getTime())
  };
}
