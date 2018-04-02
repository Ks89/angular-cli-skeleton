'use strict';

// --------------------------------------------------------
// ------------------Init env variables--------------------
// --------------------------------------------------------
const config = require('./src/config');
if (process.env.NODE_ENV !== 'production') {
  console.log('config file loaded', config);
}
// --------------------------------------------------------
// --------------------------------------------------------
// --------------------------------------------------------

const logger = require('./src/logger');
logger.warn(`Starting with NODE_ENV=${config.NODE_ENV}`);
logger.warn(`config.CI is ${config.CI} and isCI is ${config.isCI()}`);

const _ = require('lodash');
const express = require('express');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const path = require('path');
const compression = require('compression');
const cookieParser = require('cookie-parser');

const Utils = require('./src/util');
const db = require('./src/db');

// --------------------------------------------------------------------------
// ----------------------------security packages-----------------------------
// --------------------------------------------------------------------------
// All security features are prefixed with `--SEC--`
// --SEC-- - github helmetjs/expect-ct [NOT helmet]
//    The Expect-CT HTTP header tells browsers to expect Certificate Transparency
const expectCt = require('expect-ct');
// --SEC-- - github analog-nico/hpp [NOT helmet]
//    [http params pollution] security package to prevent http params pollution
const hpp = require('hpp');
// --SEC-- - [CSRF] github.com/expressjs/csurf [NOT helmet]
const csrf = require('csurf');
// --SEC-- - authentication with JWT
const passport = require('passport');
const passportJWT = require('passport-jwt');
const ExtractJwt = passportJWT.ExtractJwt;
const JwtStrategy = passportJWT.Strategy;
const passportConfig = require('./src/passport');
const jwtOptions = passportConfig.buildJwtOptions(ExtractJwt.fromAuthHeaderAsBearerToken());
passport.use(
  new JwtStrategy(jwtOptions, (jwtPayload, done) => {
    if (!jwtPayload) {
      logger.error('jwt payload not valid');
      db.removeTokens();
      done(null, false);
    }

    let isLoggedIn = db.getTokens().findIndex(o => o && o.userId === jwtPayload.id) !== -1;
    if (!isLoggedIn) {
      logger.error('cannot find previous login in tokens with payload', jwtPayload);
      return done(null, false);
    }

    try {
      const isJwtValidDate = Utils.isJwtValidDate(jwtPayload);
      if (!isJwtValidDate) {
        logger.error('jwt has an invalid data');
        db.removeTokens();
        return done(null, false);
      }

      const user = db.db[_.findIndex(db.db, o => o && o.credential && o.credential.id === jwtPayload.id)];
      const isValidUsername = jwtPayload.id === user.credential.id;

      if (user && isValidUsername && db.getTokens().length <= 1) {
        done(null, user.credential);
      } else {
        db.removeTokens();
        done(null, false);
      }
    } catch (err) {
      logger.error('exception thrown by isJwtValidDate', err);
      db.removeTokens();
      done(null, false);
    }
  })
);

// --SEC-- - github ericmdantas/express-content-length-validator [NOT helmet]
//    large payload attacks - Make sure this application is
//    not vulnerable to large payload attacks
const contentLength = require('express-content-length-validator');
// constant (max size for all reqs, also for file uploads)
const MAX_CONTENT_LENGTH_ACCEPTED = 100 * 1024 * 1024;
// --SEC-- - Helmet
const helmet = require('helmet');

const app = express();

// --------------------------------------------------------------------------
// --------------------------------------------------------------------------
// --------------------------------------------------------------------------
// --------------------------------------------------------------------------
logger.warn('Initializing helmet');
// --SEC-- - [helmet] enable helmet
// this automatically add 9 of 11 security features
/*
 -dnsPrefetchControl controls browser DNS prefetching
 -frameguard to prevent clickjacking
 -hidePoweredBy to remove the X-Powered-By header
 -hpkp for HTTP Public Key Pinning
 -hsts for HTTP Strict Transport Security
 -ieNoOpen sets X-Download-Options for IE8+
 -noSniff to keep clients from sniffing the MIME type
 -xssFilter adds some small XSS protections
 */
// The other features NOT included by default are:
/*
 -contentSecurityPolicy for setting Content Security Policy
 -noCache to disable client-side caching => I don't want this for better performances
 -referrerPolicy to hide the Referer header
 */
app.use(helmet());

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
    directives: {
      // restricts the URLs which can be used in a document's <base> element
      // baseUri: ...
      // prevents loading any assets using HTTP when the page is loaded using HTTPS
      blockAllMixedContent: true,
      // deprecated but still used in older browsers, defines the valid sources
      // for web workers and nested browsing contexts loaded using elements such as <frame> and <iframe>
      childSrc: [`'none'`],
      //restricts the URLs which can be loaded using script interfaces. The APIs that are restricted are:
      // <a> ping, Fetch, XMLHttpRequest, WebSocket, EventSource
      connectSrc: [`'self'`, 'api.github.com'],
      // serves as a fallback for the other CSP fetch directives. For more info check:
      // https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Content-Security-Policy/default-src
      defaultSrc: [`'self'`],
      // valid sources for fonts loaded using @font-face
      fontSrc: [`'self'`],
      // restricts the URLs which can be used as the target of a form submissions from a given context
      formAction: [`'self'`],
      // specifies valid parents that may embed a page using <frame>, <iframe>, <object>, <embed>, or <applet>
      frameAncestors: [`'none'`],
      // specifies valid sources for nested browsing contexts loading using elements such as <frame> and <iframe>
      frameSrc: [`'none'`],
      // specifies valid sources of images and favicons
      imgSrc: [`'self'`, 'data:'],
      // specifies which manifest can be applied to the resource.
      manifestSrc: [`'none'`],
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
      sandbox: ['allow-forms', 'allow-scripts', 'allow-same-origin'],
      // specifies valid sources for JavaScript. This includes not only URLs loaded directly into <script>
      scriptSrc: [`'self'`],
      // specifies valid sources for sources for stylesheets.
      styleSrc: [`'self'`, `'unsafe-inline'`]
      // instructs user agents to treat all of a site's insecure URLs (those served over HTTP) as though
      // they have been replaced with secure URLs (those served over HTTPS). This directive is intended
      // for web sites with large numbers of insecure legacy URLs that need to be rewritten.
      // upgradeInsecureRequests: true,
      // specifies valid sources for Worker, SharedWorker, or ServiceWorker scripts
      // workerSrc: false
    },
    // This module will detect common mistakes in your directives and throw errors
    // if it finds any. To disable this, enable "loose mode".
    loose: true,
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

app.use('/', express.static(path.join(__dirname, config.FRONT_END_PATH, '/')));

logger.warn('Initializing hpp');
// --SEC-- - http params pollution: activate http parameters pollution
// use this ALWAYS AFTER app.use(bodyParser.urlencoded()) [NOT helmet]
app.use(hpp());

logger.warn('Initializing passportjs');
app.use(passport.initialize());
passport.serializeUser(function(user, done) {
  done(null, user);
});
passport.deserializeUser(function(user, done) {
  done(null, user);
});

logger.warn('Initializing REST apis and CSRF');

// APIs for all route protected with CSRF
const APIS = require('./src/routes/apis');
const routesApi = require('./src/routes/index')(express, passport);
app.use(APIS.BASE_API_PATH, routesApi);

// we need this because 'cookie' is true in csrf
app.use(
  bodyParser.urlencoded({
    extended: true
  })
);
app.use(cookieParser());
app.use(
  csrf({
    cookie: true,
    // value: (req) => {
    //   return req.headers['x-xsrf-token'];
    // },
    key: 'X-XSRF-TOKEN', // must match the name defined in HttpClientModule on client side
    path: '/'
  })
);

app.use((req, res, next) => {
  res.cookie('_csrf', req.csrfToken());
  next();
});

app.get('/*', function(req, res) {
  res.sendFile(path.join(__dirname, config.FRONT_END_PATH, 'index.html'));
});

// error handler
app.use(function(err, req, res, next) {
  if (err.code !== 'EBADCSRFTOKEN') {
    return next(err);
  }

  // handle CSRF token errors here
  res.status(403);
  res.send('form tampered with');
});

// catch 404 and forward to error handler
// taken from https://github.com/expressjs/express/blob/master/examples/error-pages/index.js
app.use((req, res) => {
  res.status(404).json({
    message: 'Not found',
    error: {}
  });
});

// development error handler
// will print stacktrace
if (!config.isProd()) {
  app.use((err, req, res) => {
    console.error(err);
    res.status(err.status || 500).json({
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use((err, req, res) => {
  res.status(err.status || 500).json({
    message: err.message, // if you want to hide this, use a text like 'Unknown error'
    error: {}
  });
});

module.exports = app;
