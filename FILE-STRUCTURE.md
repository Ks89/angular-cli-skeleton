Complete file structure:


TODO still requires an update


```
angular-cli-skeleton/
 ├─.circleci/                     * circle ci 2 config folder (is a CI service free for open source projects)
 ├─e2e/                           * end-to-end tests with Protractor
 │ ├─src                          * end-to-end test files
 │ │ ├─app.e2e-spec.ts              * e2e test for the main page
 │ │ └─app.po.ts                    * e2e page oject for home page
 │ ├─protractor.config.js         * protractor config file for e2e testing
 │ ├─protractor-ci.config.js      * protractor config file for e2e testing in Continous Integration
 │ └─tsconfig.ts                  * config file for typescript when running e2e tests
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
 │ ├─manifest.webmanifest         * web manifest
 │ ├─ngsw-config.json             * config file for service workers
 │ ├─polyfills.ts                 * polyfills used by Angular to support older browsers
 │ ├─styles.scss                  * main scss file to define global styles
 │ ├─test.ts                      * test config file to load .spec.ts files
 │ └─typings.d.ts                 * typescript's custom types
 │
 ├─travisci/                      * scripts for travis ci (is a CI service free for open source projects)
 │
 ├─.angular-cli.json              * angular-cli config file
 ├─.travis.yml                    * travis ci config (is a CI service free for open source projects)
 ├─.dockerignore                  * docker ignore file
 ├─.editorconfig                  * standard editor config file
 ├─.prettierignore                * prettier ignore file
 ├─.prettierrc.json               * prettier config json file
 ├─.sass-lint.yml                 * sass-lint config file
 ├─appveyor.yml                   * appveyor config (is a CI service free for open source projects)
 ├─karma.conf.js                  * karma config file for unit testing
 ├─Dockerfile                     * docker config dile
 ├─package.json                   * npm packages.json
 ├─package-lock.json              * lock file for npm >= 5
 ├─proxy.conf.json                * proxy configuration for angular-cli when using 'npm start'
 ├─server.ts                      * NodeJs server to enable Server Side Rendering
 ├─tsconfig.app.json              * typescript's config file for the application (browser-side)
 ├─tsconfig.json                  * generasl typescript's config file
 ├─tsconfig.server.json           * typescript's config file for the application (server-side)
 ├─tsconfig.spec.json             * typescript's config file for unit testing
 ├─tslit.json                     * TSLint config file
 └─webpack.server.conf.js         * webpack config file to build server-side (angular-universal)
```

Created by Stefano Cappa (Ks89)
