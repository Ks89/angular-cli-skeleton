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

// --------------------------------------------------------
// ------------------Init env variables--------------------
// --------------------------------------------------------
const config = require('./config');
if (!config.isProd()) {
  console.log('config file loaded', config);
}
// --------------------------------------------------------
// --------------------------------------------------------
// --------------------------------------------------------

import { logger } from './logger';
logger.warn(`Starting with NODE_ENV=${config.NODE_ENV}`);
logger.warn(`config.CI is ${config.CI} and isCI is ${config.isCI()}`);

import * as _ from 'lodash';
import express, { NextFunction, Request, Response, Express } from 'express';
import bodyParser from 'body-parser';
import path from 'path';
import compression from 'compression';
import cookieParser from 'cookie-parser';

import { Utils } from './util';
import { db, Db, getTokens, removeTokens } from './db';

// --------------------------------------------------------------------------
// ----------------------------security packages-----------------------------
// --------------------------------------------------------------------------
// All security features are prefixed with `--SEC--`

// --SEC-- - authentication with JWT
import passport from 'passport';
import { ExtractJwt, Strategy, StrategyOptions } from 'passport-jwt';
import * as passportConfig from './passport';
const jwtOptions: StrategyOptions = passportConfig.buildJwtOptions(ExtractJwt.fromAuthHeaderAsBearerToken());
passport.use(
  new Strategy(jwtOptions, (jwtPayload, done) => {
    if (!jwtPayload) {
      logger.error('jwt payload not valid');
      removeTokens();
      done(undefined, false);
    }

    const isLoggedIn: boolean = getTokens().findIndex(o => o && o.userId === jwtPayload.id) !== -1;
    if (!isLoggedIn) {
      logger.error('cannot find previous login in tokens with payload', jwtPayload);
      return done(undefined, false);
    }

    try {
      const isJwtValidDate: boolean = Utils.isJwtValidDate(jwtPayload);
      if (!isJwtValidDate) {
        logger.error('jwt has an invalid data');
        removeTokens();
        return done(undefined, false);
      }

      const user: Db = db[_.findIndex(db, o => o && o.credential && o.credential.id === jwtPayload.id)];
      const isValidUsername: boolean = jwtPayload.id === user.credential.id;

      if (user && isValidUsername && getTokens().length <= 1) {
        done(undefined, user.credential);
      } else {
        removeTokens();
        done(undefined, false);
      }
    } catch (err) {
      logger.error('exception thrown by isJwtValidDate', err);
      removeTokens();
      done(undefined, false);
    }
  })
);

// --SEC-- - github helmetjs/expect-ct [NOT helmet]
//    The Expect-CT HTTP header tells browsers to expect Certificate Transparency
const expectCt = require('expect-ct');
// --SEC-- - github analog-nico/hpp [NOT helmet]
//    [http params pollution] security package to prevent http params pollution
import hpp from 'hpp';
// --SEC-- - [CSRF] github.com/expressjs/csurf [NOT helmet]
import csrf, { CookieOptions } from 'csurf';
// --SEC-- - github ericmdantas/express-content-length-validator [NOT helmet]
//    large payload attacks - Make sure this application is
//    not vulnerable to large payload attacks
const contentLength = require('express-content-length-validator');
// constant (max size for all reqs, also for file uploads)
const MAX_CONTENT_LENGTH_ACCEPTED = 100 * 1024 * 1024;
// --SEC-- - Helmet
import helmet, { IHelmetContentSecurityPolicyDirectives } from 'helmet';

const app = express();

// redirect all HTTP requests to HTTPS
// if (config.isProd()) {
//   app.use((req, res, next) => {
//     if (!req.secure) {
//       return res.redirect(`https://${req.get('host')}${req.url}`);
//     }
//     next();
//   });
// }

// if (config.isProd()) {
//   logger.warn('Initializing express-enforce-ssl');
//   // --SEC-- - github hengkiardo/express-enforces-ssl
//   // enforces HTTPS connections on any incoming requests.
//   app.enable('trust proxy');
//   app.use(expressEnforcesSsl());
// }

// --SEC-- - add Feature-Policy header
// taken from https://github.com/helmetjs/helmet/issues/173
app.use(
  helmet.featurePolicy({
    features: {
      geolocation: [`'none'`],
      midi: [`'none'`],
      camera: [`'none'`],
      // usb: [`'none'`], // STILL NOT SUPPERTED BY HELMET
      magnetometer: [`'none'`],
      fullscreen: [`'self'`],
      // animations: [`'self'`], // STILL NOT SUPPERTED BY HELMET
      payment: [`'none'`],
      // 'picture-in-picture': [`'none'`], // STILL NOT SUPPERTED BY HELMET
      // accelerometer: [`'none'`], // STILL NOT SUPPERTED BY HELMET
      // vr: [`'none'`],
      syncXhr: [`'none'`]
    }
  })
);

app.use(helmet());

// --SEC-- - crossdomain: X-Permitted-Cross-Domain-Policies
// prevents Adobe Flash and Adobe Acrobat from loading content on your site.
app.use(helmet.permittedCrossDomainPolicies());

// --SEC-- - hidePoweredBy: X-Powered-By forced to a fake value to
// hide the default 'express' value [helmet]
app.use(
  helmet.hidePoweredBy({
    setTo: config.HELMET_HIDE_POWERED_BY
  })
);

// --SEC-- - noCache to disable client-side caching [helmet]
// I don't want this for better performances (leave commented :))
// app.use(helmet.noCache());

// --SEC-- - referrer-policy to hide the Referer header [helmet]
app.use(
  helmet.referrerPolicy({
    policy: config.HELMET_REFERRER_POLICY
  })
);

// --SEC-- - Content Security Policy (CSP): Trying to prevent Injecting anything
//    unintended into our page. That could cause XSS vulnerabilities,
//    unintended tracking, malicious frames, and more. [helmet]
app.use(
  helmet.contentSecurityPolicy({
    directives: <IHelmetContentSecurityPolicyDirectives>{
      // restricts the URLs which can be used in a document's <base> element
      // baseUri: ...
      // prevents loading any assets using HTTP when the page is loaded using HTTPS
      blockAllMixedContent: true,
      // deprecated but still used in older browsers, defines the valid sources
      // for web workers and nested browsing contexts loaded using elements such as <frame> and <iframe>
      childSrc: [`'none'`],
      // restricts the URLs which can be loaded using script interfaces. The APIs that are restricted are:
      // <a> ping, Fetch, XMLHttpRequest, WebSocket, EventSource
      connectSrc: [`'self'`, 'api.github.com/', `https://*.google.com/`, `https://*.googleusercontent.com/`, `https://*.gstatic.com/`],
      // serves as a fallback for the other CSP fetch directives. For more info check:
      // https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Content-Security-Policy/default-src
      defaultSrc: [`'self'`],
      // valid sources for fonts loaded using @font-face
      fontSrc: [`'self'`, `https://*.gstatic.com/`],
      // restricts the URLs which can be used as the target of a form submissions from a given context
      formAction: [`'self'`],
      // specifies valid parents that may embed a page using <frame>, <iframe>, <object>, <embed>, or <applet>
      frameAncestors: [`'none'`],
      // specifies valid sources for nested browsing contexts loading using elements such as <frame> and <iframe>
      frameSrc: [`'none'`],
      // specifies valid sources of images and favicons
      imgSrc: [`'self'`, 'data:'],
      // specifies which manifest can be applied to the resource.
      manifestSrc: [`'self'`],
      // specifies valid sources for loading media using the <audio> and <video> elements
      mediaSrc: [`'none'`],
      // specifies valid sources for the <object>, <embed>, and <applet> elements
      objectSrc: [`'none'`],
      // restricts the set of plugins that can be embedded into a document by limiting the types
      // of resources which can be loaded.
      // Not setting this allows anything.
      // pluginTypes: ...
      // new directive in 2018, I don't know how to configure this
      // prefetchSrc: ...
      // reportUri is deprecated
      // reportUri: '/report-violation',
      // instructs the client to require the use of Subresource Integrity for scripts or styles on the page
      // requireSriFor: ...
      // enables a sandbox for the reqed resource similar to the <iframe> sandbox attribute.
      // It applies restrictions to a page's actions including preventing popups, preventing the execution
      // of plugins and scripts, and enforcing a same-origin policy.
      sandbox: ['allow-forms', 'allow-scripts', 'allow-same-origin', 'allow-popups'],
      // specifies valid sources for JavaScript. This includes not only URLs loaded directly into <script>
      scriptSrc: [`'self'`],
      // specifies valid sources for sources for stylesheets.
      styleSrc: [`'self'`, `'unsafe-inline'`, `https://*.googleapis.com`],
      // instructs user agents to treat all of a site's insecure URLs (those served over HTTP) as though
      // they have been replaced with secure URLs (those served over HTTPS). This directive is intended
      // for web sites with large numbers of insecure legacy URLs that need to be rewritten.
      // upgradeInsecureRequests: true,
      // specifies valid sources for Worker, SharedWorker, or ServiceWorker scripts
      workerSrc: [`'self'`]
    },
    // This module will detect common mistakes in your directives and throw errors
    // if it finds any. To disable this, enable "loose mode".
    loose: false,
    // Set to true if you only want browsers to report errors, not block them
    reportOnly: false,
    // Set to true if you want to blindly set all headers: Content-Security-Policy,
    // X-WebKit-CSP, and X-Content-Security-Policy.
    setAllHeaders: false,
    // Set to true if you want to disable CSP on Android where it can be buggy.
    disableAndroid: false,
    // Set to false if you want to completely disable any user-agent sniffing.
    // This may make the headers less compatible but it will be much faster.
    // This defaults to 'true'.
    // To disable this browser sniffing and assume a modern browser,
    // set the browserSniff option to false.
    // The default behavior of CSP is generate headers tailored for the browser
    // that’s reqing your page. If you have a CDN in front of your application,
    // the CDN may cache the wrong headers, rendering your CSP useless.
    // Make sure to eschew a CDN when using this module or set the browserSniff option to false.
    browserSniff: false
  })
);

// --SEC-- - large payload attacks:
//   this line enables the middleware for all routes [NOT helmet]
app.use(
  contentLength.validateMax({
    max: MAX_CONTENT_LENGTH_ACCEPTED,
    status: 400,
    message: config.LARGE_PAYLOAD_MESSAGE
  })
); // max size accepted for the content-length

// --SEC-- - expect-ct
//  https://scotthelme.co.uk/a-new-security-header-expect-ct/
app.use(
  expectCt({
    enforce: true,
    maxAge: 30,
    reportUri: config.HELMET_EXPECT_CT_REPORT_URI
  })
);
// --------------------------------------------------------------------------
// --------------------------------------------------------------------------
// --------------------------------------------------------------------------
// --------------------------------------------------------------------------

// compress all reqs using gzip
app.use(compression());

logger.warn('Initializing passportjs');
app.use(passport.initialize());
passport.serializeUser((user, done) => {
  done(undefined, user);
});
passport.deserializeUser((user, done) => {
  done(undefined, user);
});

// Initialize bodyParser BEFORE CSRF!!!!!
logger.warn('Initializing bodyParser');
app.use(
  bodyParser.urlencoded({
    extended: false
  })
);
app.use(cookieParser(config.COOKIE_SECRET));

// logger.warn('Initializing hpp (ALWAYS AFTER bodyParser)');
// // --SEC-- - http params pollution: activate http parameters pollution
// // use this ALWAYS AFTER app.use(bodyParser.urlencoded()) [NOT helmet]
app.use(hpp());

// CSRF must be added AFTER bodyParser and cookieParser, but BEFORE all APIS to protect
logger.warn('Initializing CSRF protection');
app.use(
  csrf({
    cookie: <CookieOptions>{
      // http://expressjs.com/en/4x/api.html#req.cookies
      key: '_csrf',
      path: '/',
      httpOnly: true,
      secure: false, // if you enable https you should set this to true
      signed: false, // investigate if csurf support signed cookies (probably not)
      sameSite: 'strict', // https://www.owaspsafar.org/index.php/SameSite
      maxAge: config.SESSION_TIMEOUT_MS
    }
  })
);
app.use((req: Request, res: Response, next: NextFunction) => {
  const csrfTokenToSendToFrontEnd: any = <any>req.csrfToken();
  res.cookie('XSRF-TOKEN', csrfTokenToSendToFrontEnd);
  next();
});

// APIs for all route protected with CSRF
logger.warn('Initializing REST apis');
import * as APIS from './routes/apis';
import * as routesApi from './routes';
const apis: any = routesApi.getApis(express, passport);
app.use(APIS.BASE_API_PATH, apis);

app.all('/api/*', (req: Request, res: Response) => {
  logger.error('path API not exist');
  res.status(404).send();
});

logger.warn('Initializing express static');
app.use('/', express.static(path.join(__dirname, config.FRONT_END_PATH)));

// error handler
app.use(function(err: any, req: Request, res: Response, next: NextFunction) {
  if (err.code !== 'EBADCSRFTOKEN') {
    return next(err);
  }
  // handle CSRF token errors here
  res.status(403);
  res.send('form tampered with');
});

// catch 404 and forward to error handler
// taken from https://github.com/expressjs/express/blob/master/examples/error-pages/index.js
app.use((req: Request, res: Response) => {
  res.status(404).json({
    message: 'Not found',
    error: {}
  });
});

// development error handler
// will print stacktrace
if (!config.isProd()) {
  app.use((err: any, req: Request, res: Response) => {
    console.error(err);
    res.status(err.status || 500).json({
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use((err: any, req: Request, res: Response) => {
  res.status(err.status || 500).json({
    message: 'Unknown server error'
  });
});

export default app;
