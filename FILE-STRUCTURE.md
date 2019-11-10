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
 │ │ │
 │ │ ├─core/                      * CoreModule provides services. You can import this module only on time in the root module
 │ │ │ ├─actions/                 * folder of ngrx actions
 │ │ │ │ └─hello-example.actions  * hello-example ngrx action
 │ │ │ ├─reducers/                * folder of ngrx reducers
 │ │ │ │ └─hello-example.reducers * hello-example ngrx reducer
 │ │ │ ├─services/                * services of the CoreModule
 │ │ │ │ ├─auth-guard.service.ts  * AuthGuard to check authentication on Angular routes
 │ │ │ │ ├─auth.service.ts        * authentication service with login, logout and so on
 │ │ │ │ ├─example.service.ts     * example of a service that call an authenticated api called /secret
 │ │ │ │ ├─github.service.ts      * example of a service with HttpClient that call github.com
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
 │ │ │ │ │ └─page-num.actions     * page-num ngrx action
 │ │ │ │ ├─reducers/              * ngrx reducers only for this lazy loaded module
 │ │ │ │ │ ├─index.ts             * main file of all reducers of this lazy loaded module
 │ │ │ │ │ └─page-num.reducers    * page-num ngrx reducer
 │ │ │ │ ├─lazy.component.spec.ts * unit test of lazy loaded component
 │ │ │ │ ├─lazy.component.ts      * lazy loaded component
 │ │ │ │ ├─lazy.html              * template of the lazy loaded component
 │ │ │ │ ├─lazy.module.ts         * definition of the lazy loaded module
 │ │ │ │ ├─lazy.routes.ts         * local routes for the lazy loaded module
 │ │ │ │ └─lazy.scss              * lazy loaded module's scss file with local styles
 │ │ │ profile/
 │ │ │ │ ├─profile.component.ts   * profile page with a call to a protected api (authenticated api with JWT). Is also contains font-awesome and ng-bootstrap examples.
 │ │ │ │ ├─profile.html           * profile template
 │ │ │ │ └─profile.scss           * profile scss file with local styles
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
 │ │ ├─app-routing.module.ts      * routes module of the app SPA
 │ │ ├─app.component.html         * main template's component of the application
 │ │ ├─app.component.scss         * scss file for the main component of the application
 │ │ ├─app.component.ts           * main component of the application
 │ │ ├─app.module.ts              * root module of the application (browser-side)
 │ │ └─app.server.module.ts       * root module of the application (server-side)
 │ │
 │ ├─assets/                      * images, icons and other stuff
 │ │
 │ ├─environments/                * folder loaded by angular cli depending on dev, prod...
 │ │ ├─environment.hmr.ts         * environment file for development with hmr
 │ │ ├─environment.prod.ts        * environment file for production
 │ │ └─environment.ts             * environment file for development without hmr
 │ │
 │ ├─theme/                       * folder with a custom theme in scss
 │ │
 │ ├─_variables.scss              * file with scss variables to customize bootstrap and to import fonts from third-party deps
 │ ├─browserconfig.xml            * config file for microsoft applications
 │ ├─favicon.png                  * application's icon
 │ ├─hmr.ts                       * file to init HMR ir running with hrm enabled
 │ ├─index.html                   * index file of this application
 │ ├─main.server.ts               * main file to boot this applcation on server-side with angular-universal
 │ ├─main.ts                      * main file to boot this applcation on browser-side (client)
 │ ├─manifest.webmanifest         * web manifest
 │ ├─polyfills.ts                 * polyfills used by Angular to support older browsers
 │ ├─styles.scss                  * main scss file to define global styles
 │ ├─test.ts                      * test config file to load .spec.ts files
 │ └─tslint.json                  * tslint config file
 │
 ├─travisci/                      * scripts for travis ci (is a CI service free for open source projects)
 │
 ├─.codeclimate.yml               * codeclimate config file
 ├─.dockerignore                  * docker ignore file
 ├─.editorconfig                  * standard editor config file
 ├─.prettierignore                * prettier ignore file
 ├─.prettierrc.json               * prettier config json file
 ├─.sass-lint.yml                 * sass-lint config file
 ├─.snyk                          * snyk file
 ├─.travis.yml                    * travis ci config (is a CI service free for open source projects)
 ├─angular-cli.json               * angular-cli config file
 ├─appveyor.yml                   * appveyor config (is a CI service free for open source projects)
 ├─browserslist                   * file to configure which browsers are supported by this application
 ├─Dockerfile                     * docker config dile
 ├─karma.conf.js                  * karma config file for unit testing
 ├─ngsw-config.json               * Service Workers config file
 ├─package.json                   * npm packages.json
 ├─package-lock.json              * lock file for npm >= 5
 ├─proxy.conf.json                * proxy configuration for angular-cli when using 'npm start'
 ├─server.ts                      * NodeJs server to enable Server Side Rendering
 ├─static.paths.ts                * array with paths used by server.ts for Server Side Rendering
 ├─tsconfig.app.json              * typescript's config file for the application (browser-side)
 ├─tsconfig.json                  * generasl typescript's config file
 ├─tsconfig.server.json           * typescript's config file for the application (server-side)
 ├─tsconfig.spec.json             * typescript's config file for unit testing
 ├─tslit.json                     * TSLint config file
 └─webpack.server.conf.js         * webpack config file to build server-side (angular-universal)
```

Created by Stefano Cappa (Ks89)
