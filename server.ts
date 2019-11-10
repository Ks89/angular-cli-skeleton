/*
 * MIT License
 *
 * Copyright (c) 2017-2019 Stefano Cappa
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */

// These are important and needed before anything else
import 'zone.js/dist/zone-node';
import 'reflect-metadata';

import { renderModuleFactory } from '@angular/platform-server';
import { enableProdMode } from '@angular/core';

import * as express from 'express';
import * as compression from 'compression';
import { join } from 'path';
import { readFileSync } from 'fs';

const domino = require('domino');

// Faster server renders w/ Prod mode (dev mode never needed)
enableProdMode();

// Our index.html we'll use as our template
const template = readFileSync(join(process.cwd(), 'dist', 'client', 'index.html')).toString();
const win = domino.createWindow(template);

global['window'] = win;
Object.defineProperty(win.document.body.style, 'transform', {
  value: () => {
    return {
      enumerable: true,
      configurable: true
    };
  }
});
global['document'] = win.document;
global['CSS'] = null;

// WORKAROUND until SSR will support all third-party libraries
global['Mousetrap'] = function() {
  this.reset = function() {};
};

const PORT = process.env.PORT || 3000;
const DIST_FOLDER = join(process.cwd(), 'dist', 'client');

// * NOTE :: leave this as require() since this file is built Dynamically from webpack
const { AppServerModuleNgFactory, LAZY_MODULE_MAP } = require('./dist/client-server/main');

import { provideModuleMap } from '@nguniversal/module-map-ngfactory-loader';

const app = express();
app.use(compression());

app.engine('html', (_, options, callback) => {
  renderModuleFactory(AppServerModuleNgFactory, {
    // Our index.html
    document: template,
    url: options.req.url,
    // DI so that we can get lazy-loading to work differently (since we need it to just instantly render it)
    extraProviders: [provideModuleMap(LAZY_MODULE_MAP)]
  }).then(html => {
    callback(null, html);
  });
});

app.set('view engine', 'html');
app.set('views', DIST_FOLDER);

app.get('*.*', express.static(DIST_FOLDER));
app.get('*', (req, res) => {
  global['navigator'] = req['headers']['user-agent'];
  res.render('index', { req });
});

app.listen(PORT, () => console.log(`Listening on http://localhost:${PORT}`));
