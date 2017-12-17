[![Travis Build](https://travis-ci.org/Ks89/angular-cli-skeleton.svg?branch=master)](https://travis-ci.org/Ks89/angular-cli-skeleton)   [![AppVeyor Build](https://ci.appveyor.com/api/projects/status/9vy98a94l2213rb9/branch/master?svg=true)](https://ci.appveyor.com/project/Ks89/angular-cli-skeleton/branch/master)   [![CircleCI Build](https://circleci.com/gh/Ks89/angular-cli-skeleton/tree/master.svg?style=svg)](https://circleci.com/gh/Ks89/angular-cli-skeleton/tree/master)   [![Code Climate](https://codeclimate.com/github/Ks89/angular-cli-skeleton/badges/gpa.svg)](https://codeclimate.com/github/Ks89/angular-cli-skeleton)   [![CodeClimate Coverage](https://codeclimate.com/github/Ks89/angular-cli-skeleton/badges/coverage.svg)](https://codeclimate.com/github/Ks89/angular-cli-skeleton/coverage)   [![Coveralls Coverage](https://coveralls.io/repos/github/Ks89/angular-cli-skeleton/badge.svg?branch=master)](https://coveralls.io/github/Ks89/angular-cli-skeleton?branch=master)   [![Known Vulnerabilities](https://snyk.io/test/github/ks89/angular-cli-skeleton/badge.svg)](https://snyk.io/test/github/ks89/angular-cli-skeleton)

<br>

# angular-cli-skeleton
A simple ready to use skeleton project with angular-cli, Angular 5, Bootstrap 4 beta, ng-bootstrap, ngrx-store and so on.

This project is still experimental and it will be my official skeleton project for Angular applications.
I need more time to add all features.

When this project will be ready, I'll deprecate my previous official skeleton called [angular-webpack-skeleton](https://github.com/Ks89/angular-webpack-skeleton).

Watch this GitHub's project to see news and updates and add a star if you like it. I'll be really happy :)

## Features
- TODO

## News
- *12/??/2017* - Beta 1 - Check [HERE](https://github.com/Ks89/angular-cli-skeleton/releases)

## Changelog
Full changelog [HERE](https://github.com/Ks89/angular-cli-skeleton/blob/master/CHANGELOG.md)

## File structure
This reduced structure is based on [Angular style-guide](https://angular.io/guide/styleguide) and on my personal experience.
For the full file structure check [HERE](https://github.com/Ks89/angular-cli-skeleton/blob/master/FILE-STRUCTURE.md).


```
angular-cli-skeleton/
 ├─e2e/                           * end-to-end tests with Protractor
 │ ├─app.e2e-spec.ts              * e2e test for the main page
 │ ├─app.po.ts                    * e2e page oject for home page
 │ └─tsconfig.e2e.ts              * config file for typescript when running e2e tests
 │
 ├─src/                           * main source folder
 │ ├─app/                         * source folder of 'app' SPA
 │ │ ├─app-shell/                 * app-shell folder (STILL UNUSED)
 │ │ ├─core/                      * CoreModule provides services. You can import this module only on time in the root module
 │ │ │ ├─actions/                 * folder of ngrx actions
 │ │ │ │ └─hello.example.ts       * hello-example ngrx action
 │ │ │ ├─reducers/                * folder of ngrx reducers
 │ │ │ │ └─hello.example.ts       * hello-example ngrx reducer
 │ │ │ ├─services/                * services of the CoreModule
 │ │ │ │ ├─example.service.ts     * example of a synchronous service
 │ │ │ │ ├─github.service.ts      * example of an asynchronous service with HttpClient
 │ │ │ │ └─services.ts            * export an array of services to easely import into the module's definition
 │ │ │ ├─core.module.ts           * definition of the CoreModule
 │ │ │ └─module-import-guard.ts   * guard to prevent multiple import of the CoreModule
 │ │ │
 │ │ ├─pages/                     * pages/features of the 'app' SPA
 │ │ │ ├─404/
 │ │ │ │ └─not-found.component.ts * 404 component shown for route '**'
 │ │ │ ├─home/
 │ │ │ │ ├─home.component.ts      * homepage component shown for route '/'
 │ │ │ │ ├─home.html              * homepage template
 │ │ │ │ └─home.scss              * homepage scss file with local styles
 │ │ │ ├─lazy/                    * lazy loaded module shown for route 'lazy'
 │ │ │ │ ├─actions/               * ngrx actions only for this lazy loaded module
 │ │ │ │ │ └─page-num.ts          * page-num ngrx action
 │ │ │ │ ├─reducers/              * ngrx reducers only for this lazy loaded module
 │ │ │ │ │ ├─index.ts             * main file of all reducers of this lazy loaded module
 │ │ │ │ │ └─page-num.ts          * page-num ngrx reducer
 │ │ │ │ ├─lazy.component.spec.ts * unit test of lazy loaded component
 │ │ │ │ ├─lazy.component.ts      * lazy loaded component
 │ │ │ │ ├─lazy.html              * template of the lazy loaded component
 │ │ │ │ ├─lazy.module.ts         * definition of the lazy loaded module
 │ │ │ │ ├─lazy.routes.ts         * local routes for the lazy loaded module
 │ │ │ │ └─lazy.scss              * lazy loaded module's scss file with local styles
 │ │ │ ├─sw/
 │ │ │ │ ├─sw.component.ts        * service-worker component shown for route '/sw'
 │ │ │ │ ├─sw.html                * service-worker template
 │ │ │ │ └─sw.scss                * service-worker scss file with local styles
 │ │ │ └─components.ts            * export an array of components to easely import into the module's definition
 │ │ │
 │ │ ├─reducers/                  * define main ngrx reducer for the app SPA
 │ │ │
 │ │ ├─shared/                    * SharedModule provides common components, directives... It can be imported more times also by sub-modules
 │ │ │ ├─components/              * components of the SharedModule
 │ │ │ │ ├─footer/                * footer component
 │ │ │ │ ├─navbar/                * navbar componet
 │ │ │ │ ├─page-header/           * page header component
 │ │ │ │ └─components.ts          * export an array of components to easely import into the module's definition
 │ │ │ └─shared.module.ts         * definition of the SharedModule
 │ │ │
 │ │ ├─app.component.html         * main template's component of the application
 │ │ ├─app.component.scss         * scss file for the main component of the application
 │ │ ├─app.component.spec.ts      * main component's unit test
 │ │ ├─app.component.ts           * main component of the application
 │ │ ├─app.module.ts              * root module of the application (browser-side)
 │ │ ├─app.server.module.ts       * root module of the application (server-side)
 │ │ └─app-routing.module.ts      * routes module of the app SPA
 │ │
 │ ├─styles/                      * root styles (CSS/SCSS) for the entire application (all SPAs)
 │ │ ├─headings.css               * css file (to show that you can use both css and scss)
 │ │ ├─loading.scss               * SCSS loading spinner
 │ │ ├─styles.scss                * main SCSS that imports all other SCSS in this directory (loading ad variables)
 │ │ └─variables.scss             * SCSS variables
 │ │
 │ ├─assets/                      * images, icons and other stuff
 │ │
 │ ├─environments/                * folder loaded by angular cli depending on dev, prod...
 │ │ ├─environment.hmr.ts         * environment file for development with hmr
 │ │ ├─environment.prod.ts        * environment file for production
 │ │ └─environment.ts             * environment file for development without hmr
 │ │
 │ ├─_variables.scss              * file with scss variables to customize bootstrap and to import fonts from third-party deps
 │ ├─favicon.ico                  * application's icon
 │ ├─hmr.ts                       * file to init HMR ir running with hrm enabled
 │ ├─index.html                   * index file of this application
 │ ├─main.server.ts               * main file to boot this applcation on server-side with angular-universal
 │ ├─main.ts                      * main file to boot this applcation on browser-side (client)
 │ ├─manifest.json                * web manifest
 │ ├─ngsw-config.json             * config file for service workers
 │ ├─polyfills.ts                 * polyfills used by Angular to support older browsers
 │ ├─styles.scss                  * main scss file to define global styles
 │ ├─test.ts                      * test config file to load .spec.ts files
 │ ├─tsconfig.app.json            * typescript's config file for the application (browser-side)
 │ ├─tsconfig.server.json         * typescript's config file for the application (server-side)
 │ ├─tsconfig.spec.json           * typescript's config file for unit testing
 │ └─typings.d.ts                 * typescript's custom types
 │
 ├─.angular-cli.json              * angular-cli config file
 ├─karma.conf.js                  * karma config file for unit testing
 ├─protractor.config.js           * protractor config file for e2e testing
 ├─protractor-ci.config.js        * protractor config file for e2e testing in Continous Integration
 ├─proxy.conf.json                * proxy configuration for angular-cli when using 'npm start'
 ├─server.ts                      * NodeJs server to enable Server Side Rendering
 ├─tsconfig.json                  * typescript's config file
 ├─tslit.json                     * TSLint config file
 └─webpack.server.conf.js         * webpack config file to build server-side (angular-universal)
```


## Requirenments
- Nodejs >= 8.0.0
- npm >= 5.2.0


## Install

### Install global dependencies
- `npm install -g lite-server`

### Install local dependencies
- `npm install`


## Build

### Build client app in 'dist' folder (development mode)
- `npm run build:dev`
- `cd dist`
- `lite-server`

### Build client app in 'dist' folder (production mode + AOT)
- `npm run build:prod`
- `cd dist`
- `lite-server`

#### Build both client and server apps in 'dist' folder (production mode + AOT + angular-universal)
- `npm run build:ssr`


## Run

### Build and run development server with HMR (development mode)
- `npm start`

### Build and run development server with HMR (production mode + AOT)
- `npm start:prod`

### Run client app previously built in 'dist' folder (development mode)
- `cd dist/browser`
- `lite-server`

### Run client app previously built in 'dist' folder (production mode + AOT)
- `cd dist/browser`
- `lite-server`

### Run client app previously built in 'dist' folder (production mode + AOT + angular-universal)
- `npm run serve:ssr`


## Test

### Test (check coverage/html/index.html with the results)
- `npm test`

### Test e2e with protractor
- `npm run webdriver:update` (if you have problems, try again removing `./node_modules` and executing `npm install` again)
- `npm run e2e`


## Docs

### To generate typescript's documentation with typedocs (check docs/index.html for the result)
- `npm run docs`

### To generate the really cool compodoc's documentation (check documentation/index.html for the result)
- `npm run docs:compodoc`

or

- `npm run docs:compodoc:serve` to navigate the resulting documentation in your browser


## Others

### Clean all
- `npm run clean`

### SonarQube support
STILL NOT AVAILABLE IN THIS SKELETON


## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).

To deploy with a custom path, please check here: https://angular.io/guide/deployment


## License

**MIT License**

Copyright (c) 2017 **Stefano Cappa**

**This license is valid to all my files in this repo**

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

<br/>

**Created by Stefano Cappa**
