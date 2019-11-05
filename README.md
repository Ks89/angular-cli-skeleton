[![Travis Build](https://travis-ci.org/Ks89/angular-cli-skeleton.svg?branch=master)](https://travis-ci.org/Ks89/angular-cli-skeleton)   [![AppVeyor Build](https://ci.appveyor.com/api/projects/status/9vy98a94l2213rb9/branch/master?svg=true)](https://ci.appveyor.com/project/Ks89/angular-cli-skeleton/branch/master)   [![CircleCI Build](https://circleci.com/gh/Ks89/angular-cli-skeleton/tree/master.svg?style=svg)](https://circleci.com/gh/Ks89/angular-cli-skeleton/tree/master)

[![vulnerabilities](https://snyk.io/test/github/ks89/angular-cli-skeleton/badge.svg)](https://snyk.io/test/github/ks89/angular-cli-skeleton)   [![Greenkeeper badge](https://badges.greenkeeper.io/Ks89/angular-cli-skeleton.svg)](https://greenkeeper.io/)   [![FOSSA Status](https://app.fossa.io/api/projects/git%2Bgithub.com%2FKs89%2Fangular-cli-skeleton.svg?type=shield)](https://app.fossa.io/projects/git%2Bgithub.com%2FKs89%2Fangular-cli-skeleton?ref=badge_shield)   [![Code Climate](https://codeclimate.com/github/Ks89/angular-cli-skeleton/badges/gpa.svg)](https://codeclimate.com/github/Ks89/angular-cli-skeleton)   [![CodeClimate Coverage](https://codeclimate.com/github/Ks89/angular-cli-skeleton/badges/coverage.svg)](https://codeclimate.com/github/Ks89/angular-cli-skeleton/coverage)   [![Coveralls Coverage](https://coveralls.io/repos/github/Ks89/angular-cli-skeleton/badge.svg?branch=master)](https://coveralls.io/github/Ks89/angular-cli-skeleton?branch=master)

[![GitHub release](https://img.shields.io/github/release/Ks89/angular-cli-skeleton.svg?style=flat-square)](https://github.com/Ks89/angular-cli-skeleton)   [![GitHub (pre-)release](https://img.shields.io/github/release/Ks89/angular-cli-skeleton/all.svg?style=flat-square)](https://github.com/Ks89/angular-cli-skeleton)

[![Donate](https://img.shields.io/badge/Donate-PayPal-green.svg)](https://www.paypal.me/stefanocappa)

*Do you like angular-cli-skeleton? Please, add a 'star' to support this library*

<br>

### This project is not dead, I'm simply waiting for IVY render (RENDER 3) + runtime i18n support. When Google will release this, I'll update the repo with many new features. So I suggest to star and watch this project, if you are interested. Angular 7 is out, but unfortunately IVY is still not available, so I'll wait again :(


# angular-cli-skeleton

A simple ready to use skeleton project with angular-cli (optionally also angular-universal), Angular 6, Bootstrap 4, ng-bootstrap, ngrx-store and so on.

This project my previous older skeleton project called [angular-webpack-skeleton](https://github.com/Ks89/angular-webpack-skeleton).

If you like it, please add a star. It will be really apprecieted.

## Features
- Typescript >= 2.7
- Angular 6
    - [Ahead of Time (AOT)](https://angular.io/guide/aot-compiler) enabled by default for Angular >= 5
    - [Lazy loading](https://angular.io/guide/ngmodule#lazy-loading-modules-with-the-router)
    - The new [HttpClient](https://angular.io/guide/http#httpclient) of Angular >= 4.3
    - [RxJS 6](https://github.com/ReactiveX/rxjs/blob/master/doc/lettable-operators.md) with lettable operators and `rxjs-compat` for legacy libraries
- [Bootstrap 4](http://getbootstrap.com/) with a custom theme (check `./src/_variables.scss`), [ng-bootstrap](https://github.com/ng-bootstrap/ng-bootstrap)
- [FontAwesome 5](https://fontawesome.com/)
- [jQuery](https://jquery.com/)
- [Web App Manifest](https://developers.google.com/web/fundamentals/web-app-manifest/) support to add it as a standalone app on mobile devices (see `manifest.json`)
- [Service Workers](https://developers.google.com/web/fundamentals/primers/service-workers/) to create an offline application (see `./src/ngsw-config.json`)
- *[socket.io](https://github.com/socketio/socket.io) (still work in progress and TEMPORARY DISABLED. Check [this issue](https://github.com/Ks89/angular-cli-skeleton/issues/1)*
- Reactive storage based on Redux
    - [@ngrx/store](https://github.com/ngrx/store) >= 4
    - [@ngrx/store-devtools](https://github.com/ngrx/store-devtools) >= 4
- angular-cli
    - different profiles: 'development', 'development with HMR', 'production', 'production with SSR'
    - [Hot Module Replacement (HMR)](https://webpack.js.org/concepts/hot-module-replacement/)
    - [Tree shaking](https://webpack.js.org/guides/tree-shaking/)
    - [SASS support](https://github.com/webpack-contrib/sass-loader)
    - [UglifyJs](https://github.com/webpack-contrib/uglifyjs-webpack-plugin) and [build-optimizer](https://www.npmjs.com/package/@angular-devkit/build-optimizer) for production builds
    - [Bundle Analyzer](https://github.com/th0r/webpack-bundle-analyzer)
    - [Proxying support](https://github.com/angular/angular-cli/wiki/stories-proxy) (optional to proxy your rest services with [webpack-dev-server](https://github.com/webpack/webpack-dev-server))
    - [Server Side Rendering](https://universal.angular.io/) with [angular-universal](https://github.com/angular/universal)
    - *AppShell (still work in progress and TEMPORARY DISABLED. Check [this issue](https://github.com/Ks89/angular-cli-skeleton/issues/22)*
- Testing
    - Unit testing with [Karma](https://karma-runner.github.io) and [Jasmine](https://jasmine.github.io/)
      - Custom advanced configuration to specify different browsers on CIs (check 'getBrowsers()' in `./karma.conf.js`)
      - Multiple launcher for browsers (Chrome, Firefox, IE, Edge, Safari). See `karma.conf.js`
      - [Chrome Headless](https://developers.google.com/web/updates/2017/04/headless-chrome) support to run unit tests (better than [PhantomJS](http://phantomjs.org/))
      - Multiple coverage reporters: `json`, `html`, `lcovonly`, `mocha`, SonarQube and also in your console 
    - End to end (E2E) testing with [Protractor](http://www.protractortest.org) and [WebDriver JS](https://github.com/SeleniumHQ/selenium/wiki/WebDriverJs)
    - Code coverage with [IstanbulJs](https://github.com/istanbuljs/istanbuljs)
- Code analysis and quality
    - [TSLint](https://github.com/palantir/tslint)
    - [Codelyzer](https://github.com/mgechev/codelyzer)
    - [Sass-lint](https://github.com/sasstools/sass-lint)
    - [Prettier](https://prettier.io/) triggered by [pre-commit](https://github.com/observing/pre-commit) hook 
- Documentation
    - [TypeDoc](https://github.com/TypeStrong/typedoc)
    - [Compodoc](https://github.com/compodoc/compodoc) also with both 'watch mode' and 'watch + serve modes'
- Docker
    - [Docker](https://www.docker.com/) with the production build (no ssr at the moment) and [ngnix](https://nginx.org/en/)
    - See all my public repos here [Docker Hub](https://hub.docker.com/u/ks89/)
- Continous Integration
    - [Travis CI](https://travis-ci.org/)
    - [Circle CI](https://circleci.com/)
    - [AppVeyor](https://www.appveyor.com/)
    - [SonarQube](https://www.sonarqube.org/) on [SonarCloud](https://sonarcloud.io/dashboard?id=angular-webpack-skeleton) with installation instructions below
    - [Jenkins 2](https://jenkins-ci.org/) with installation instructions below
- **Multiple server-side implementations** with NodeJS
    - NodeJS + Express in **Javascript** (see `./servers/node-express-js`)
    - NodeJS + Express in **Typescript** (see `./servers/node-express-ts`)
    - NodeJS + Koa in **Javascript** (see `./servers/node-koa-js`)
- and many more...

## News
- *??/??/2018* - 1.0.0-beta.3 - Check [HERE](https://github.com/Ks89/angular-cli-skeleton/releases)
- *04/03/2018* - 1.0.0-beta.2 - Check [HERE](https://github.com/Ks89/angular-cli-skeleton/releases)
- *01/06/2018* - 1.0.0-beta.1 - Check [HERE](https://github.com/Ks89/angular-cli-skeleton/releases)

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
 ├─servers/                       * server-side implementations to manage authentication
 │ ├─node-express-js              * NodeJS with ExpressJS Javascript implementation
 │ ├─node-express-js              * NodeJS with ExpressJS Typescript implementation
 │ └─node-koa-js                  * NodeJS with KoaJS Javascript implementation
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
- Nodejs >= 8.0.0 (please use always the latest version)
- npm >= 5.2.0 (please use always the latest version)


## What you can do right now?
- build and run the front-end of this project with angular-cli, but authentication won't work (obviously, because It needs a server)
- build this project and run it with one of the two servers in `./servers` (authentication is working!!!)
- build and run this project with angular-universal (authentication still not supported - COMING SOON)

This is a 'work in progress' project, so if you need other info, please open an issue. At the moment, documentation and README are minimalistic.


## Install

### Install global dependencies
- `npm install -g lite-server`

### Install local dependencies
1. `npm install` (from the folder of this project)
2. `cd servers/node-express-js && npm install`
3. `cd servers/node-express-ts && npm install`
3. `cd servers/node-koa-js && npm install`


## Build

### Build client app in 'dist' folder (development mode)
- `npm run build:dev`
- `cd dist`
- `lite-server`

### Build client app in 'dist' folder (production mode + AOT + build-optimizer)
- `npm run build:prod`
- `cd dist`
- `lite-server`

#### Build both client and server apps in 'dist' folder (production mode + AOT + build-optimizer + angular-universal)
- `npm run build:ssr`


## Run (without server-side)

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


## Run (WITH server-side and authentication features)

### Build and run development vanilla javascript server with authentication feature
1. `npm run build:dev`
2. `cd servers/node-express-js && npm start`

### Build and run production vanilla javascript server with authentication feature
1. `npm run build:prod`
2. `cd servers/node-express-js && npm start`

or

### Build and run development Typescript server with authentication feature
1. `npm run build:dev`
2. `cd servers/node-express-ts && npm run build && npm start`

### Build and run production Typescript server with authentication feature
1. `npm run build:prod`
2. `cd servers/node-express-ts && npm run build && npm start`


## Test

### Test (check coverage/html/index.html with the results)
- `npm test`

### Test e2e with protractor
- `npm run webdriver:update` (if you have problems, try again removing `./node_modules` and executing `npm install` again)
- `npm run e2e`


## Docs

### To generate typescript's documentation with typedocs (check docs/index.html for the result)
- `npm run docs:typedoc`

### To generate the really cool compodoc's documentation (check documentation/index.html for the result)
- `npm run docs:compodoc`

or

- `npm run docs:compodoc:serve` to navigate the resulting documentation in your browser


## Others

### Clean all
- `npm run clean`

### Bundle analyzer
- Run either `npm run build:dev:stats` or `npm run build:prod:stats`
- Open analyzer with `npm run analyze:bundle` to see the result

### Jenkins support
With this tutorial, you'll configure Jenkins to build your project from GitHub, where the Pipeline's script is in the remote repository.

#### I want to use Jenkins on my pc (tutorial tested on macOS)
1. Install java and define all necessary env variables for your OS
2. Download the latest version of Jenkins 2 [HERE](https://jenkins.io/download/). If you are using macOS, I suggest to use [Homebrew](https://brew.sh/index_it.html)
3. Install Jenkins following [this instruction](https://jenkins.io/doc/book/installing/)
4. Run it (if installed with HomeBrew, run `jenkins` in your terminal)
5. Navigate to `http://localhost:8080` and unlock Jenkins (for more info check [HERE](https://jenkins.io/doc/book/installing/#unlocking-jenkins)) 
6. Install all suggested plugins
7. Create a new admin user (please, you shouldn't skip this step) as explained [HERE](https://jenkins.io/doc/book/installing/#creating-the-first-administrator-user)
8. Navigate to `http://localhost:8080/pluginManager/available` and install `NodeJS Plugin`
9. Restart Jenkins and log in with the new admin user created at step 7
10. Navigate to `http://localhost:8080/configureTools/` and add a new NodeJS installation (remember to save all changes at the end) with these parameters:
    - Name: node-8.4.0 (this name must match `tool name` in your pipeline's script. If you are a beginner, please don't change it)
    - Install automatically: checked
    - Version: NodeJS 8.4.0
11. Create a new **PIPELINE** at `http://localhost:8080/view/all/newJob` called for instance `angular-cli-skeleton`
12. Check both `GitHub project` (use this url: `https://github.com/Ks89/angular-cli-skeleton/`) and `GitHub hook trigger for GIT Scm polling`
13. In the Pipeline section, choose `Pipeline script from SCM`, with SCM `Git` and URL `https://github.com/Ks89/angular-cli-skeleton` to get the pipeline's script from `./Jenkinsfile` via git
14. Script Path must match the Jenkins file name in your repository (i.e. `Jenkinsfile-local-macOS`)
15. Save and build

PS: if you want to use Jenkins on a remote server, you should add these two env variables:
- CI=true
- JENKINS=true

#### I want to use Jenkins on a private server
COMING SOON a tutorial to install and configure Jenkins in a VPS at OVH.com


### SonarQube support
1. Install java and define all necessary env variables for your OS
2. Download and install SonarQube on your pc/mac [HERE](https://docs.sonarqube.org/display/SONAR/Installing+the+Server#InstallingtheServer-installingWebServerInstallingtheWebServer)
3. Start SonarQube running the right script (make sure to run it with execution privileges) in `INSTALL_FOLDER/bin/YOUR_OS/SCRIPT_NAME start` (for instance on macOS I'm using `./INSTALL_FOLDER/bin/macosx-universal-64/sonar.sh start`)
4. Navigate with your browser to `http://localhost:9000` to see if everything is working
5. If you need to login ad administrator to SonarQube use (user: `admin`, password: `admin`)
6. Install the right TypeScript plugin [HERE](https://github.com/Pablissimo/SonarTsPlugin/releases) downloading the latest jar binary
7. Copy that .jar into `INSTALL_FOLDER/extensions/plugins` (in necessary remove the other TypeScript plugin in this folder)
8. Restart SonarQube running `INSTALL_FOLDER/bin/YOUR_OS/SCRIPT_NAME stop` and `INSTALL_FOLDER/bin/YOUR_OS/SCRIPT_NAME start`
9. Login as admin at `http://localhost:9000`
10. At `http://localhost:9000` find the TypeScript tab (in the sidebar), paste in the TsLint path (for instance, on macOS I'm using my global installation of TsLint `/usr/local/lib/node_modules/tslint/bin/tslint`). If you are a Windows user use `C:\Users\[Username]\AppData\Roaming\npm\node_modules\tslint\bin\tslint`

#### Run SonarQube analysis and send results to sonarcloud.io (free for open-source projects)
1. Download and install sonar-scanner on your pc/mac [HERE](https://docs.sonarqube.org/display/SCAN/Analyzing+with+SonarQube+Scanner#AnalyzingwithSonarQubeScanner-Installation)
2. Define a new unique `project key`. I used the name of the repo `angular-cli-skeleton` for this project
3. Create an account of [sonarcloud](https://sonarcloud.io/)
4. Go to [account security](https://sonarcloud.io/account/security) to generate a new token with your `project key`: `angular-cli-skeleton`
5. Clean all your useless folders running `npm run clean` inside the root of your project
6. Modify this script with your info and run it from the root of your project
    ```sonar-scanner \
          -Dsonar.projectKey=your_project_key_that_must_be_unique \
          -Dsonar.sources=. \
          -Dsonar.host.url=https://sonarcloud.io \
          -Dsonar.organization=your_organization_key \
          -Dsonar.login=abcdef0123456789
    ```
    For instance, I used this:
    ```
    sonar-scanner \
        -Dsonar.projectKey=angular-cli-skeleton \
        -Dsonar.sources=. \
        -Dsonar.host.url=https://sonarcloud.io \
        -Dsonar.organization=ks89-github \
        -Dsonar.login=SONARCLOUDIO_SECRET_TOKEN
    ```
7. Navigate to `https://sonarcloud.io/dashboard?id=YOUR_PROJECT_NAME (The path of this project is `https://sonarcloud.io/dashboard?id=angular-cli-skeleton`)
8. If everything is ok, then I suggest to modify both 'analyze:sonar' and 'analyze:sonar:ci' scripts into `package.json` based on step 6, omitting `-Dsonar.login=`, because this is a secret key and you shouldn't commit it
9. Now try to run sonar analysis with 'npm run analyze:sonar -- -Dsonar.login=SONARCLOUDIO_SECRET_TOKEN'


## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).

To deploy with a custom path, please check here: https://angular.io/guide/deployment

For other questions, please feel free to open an issue.


## License

**MIT License**

Copyright (c) 2017-2019 **Stefano Cappa**

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

If you like my projects you can do a free donation here [![Donate](https://img.shields.io/badge/Donate-PayPal-green.svg)](https://www.paypal.me/stefanocappa)


## FOSSA report

[![FOSSA Status](https://app.fossa.io/api/projects/git%2Bgithub.com%2FKs89%2Fangular-cli-skeleton.svg?type=large)](https://app.fossa.io/projects/git%2Bgithub.com%2FKs89%2Fangular-cli-skeleton?ref=badge_large)

<br/>

**Created by Stefano Cappa**
