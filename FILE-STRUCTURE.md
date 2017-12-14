Complete file structure:

```
angular-webpack-skeleton/
 ├─.circleci/                     * Circle CI 2 config folder
 ├─assets/                        * Images, icons, manifest.json and so on
 ├─bootstrap/                     * bootstrap-loader configuration files
 │ ├─after.scss                   * this gets loaded after bootstrap/variables is loaded
 │ └─before.scss                  * this gets loaded before bootstrap/variables is loaded
 │
 ├─config/                        * config files
 │ ├─html-elements-plugin/        * webpack plugin to add css, icons... during the creation of html files
 │ ├─head-config.common.js        * list of files to be loaded by 'html-elements-plugin'
 │ ├─helpers.js                   * helper functions for configuration files
 │ ├─karma.conf.js                * karma config file for unit testing
 │ ├─karma-test-runner.js         * karma test-runner file for unit testing
 │ ├─protractor.conf.js           * protractor config for e2e tests
 │ ├─webpack.common.js            * common webpack config (for both dev and prod)
 │ ├─webpack.dev.js               * local developmet webpack config
 │ ├─webpack.prod.js              * production webpack config
 │ └─webpack.test.js              * testing webpack config
 │
 ├─setup/                         * some setup files to help you to init the evironment
 │
 ├─e2e/                           * end-to-end tests with Protractor
 │ ├─app.e2e.ts                   * e2e test for the main page
 │ ├─home.e2e.ts                  * e2e test for home page
 │ └─home.e2e.ts                  * e2e test for service-worker page
 │
 ├─src/                           * main source folder
 │ ├─admin/                       * source folder of 'admin' SPA. Similar to 'app'
 │ │
 │ ├─app/                         * source folder of 'app' SPA
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
 │ │ ├─app.component.ts           * main component of the app SPA
 │ │ ├─app.e2e.ts                 * example of an e2e test for 'app' SPA
 │ │ ├─app.html                   * main template's component of the app SPA
 │ │ ├─app.module.ts              * root module of the app SPA
 │ │ └─app.routing.ts             * routes of the app SPA
 │ │
 │ ├─styles/                      * root styles (CSS/SCSS) for the entire application (all SPAs)
 │ │ ├─headings.css               * css file (to show that you can use both css and scss)
 │ │ ├─loading.scss               * SCSS loading spinner
 │ │ ├─styles.scss                * main SCSS that imports all other SCSS in this directory (loading ad variables)
 │ │ └─variables.scss             * SCSS variables
 │ │
 │ ├─admin.aot.ts                 * main file to boot 'admin' SPA with AOT compiler
 │ ├─admin.ejs                    * admin template that will be converted into an html (admin SPA)
 │ ├─admin.ts                     * main file to boot 'admin' SPA
 │ ├─environmet.ts                * file to configure Angular debug/prod (don't touch this)
 │ ├─index.ejs                    * index template that will be converted into an html (app SPA)
 │ ├─main.aot.ts                  * main file to boot 'app' SPA with AOT compiler
 │ ├─main.ts                      * main file to boot 'app' SPA
 │ ├─polyfills.ts                 * polyfills used by Angular to support older browsers
 │ └─typings.d.ts                 * custom types for Typescript
 │
 ├─travisci/                      * Scripts for Travis continous integration
 │
 ├─.bootstraprc                   * main bootstrap-loader config file
 ├─.travis.yml                    * travis ci config
 ├─appveyor.yml                   * appveyor config
 ├─karma.conf.js                  * main karma config file for unit testing
 ├─package.json                   * npm packages.json
 ├─package-lock.json              * lock file for npm >= 5
 ├─postcss.config.js              * postcss config file
 ├─protractor.config.js           * main protractor config file for e2e testing
 ├─sonar-project.properties       * Config file for SonarQube
 ├─tsconfig.json                  * Config file for Typescript
 ├─tsconfig-aot.json              * Config file for Typescript used by AOT compiler
 ├─tslit.json                     * TSLint config file
 └─webpack.conf.js                * main webpack config file
```

Created by Stefano Cappa (Ks89)