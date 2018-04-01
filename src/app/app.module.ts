import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { ServiceWorkerModule } from '@angular/service-worker';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { mainReducers } from './reducers';

// ************************ font-awesome 5 ************************
import { faExternalLinkAlt, faPlus, faTimes, faDownload } from '@fortawesome/fontawesome-free-solid';
import * as fontawesome from '@fortawesome/fontawesome';
fontawesome.library.add(faExternalLinkAlt, faPlus, faTimes, faDownload);
// ****************************************************************

import { environment } from '../environments/environment';

import { AppRoutingModule } from './app-routing.module';
import { SharedModule } from './shared/shared.module';
import { CoreModule } from './core/core.module';
import { COMPONENTS } from './pages/components';
import { AppComponent } from './app.component';
import { ToastrModule } from 'ngx-toastr';

@NgModule({
  declarations: [AppComponent, COMPONENTS],
  imports: [
    // Add .withServerTransition() to support Universal rendering.
    // The application ID can be any identifier which is unique on
    // the page.
    BrowserModule.withServerTransition({ appId: 'my-app' }),
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,

    ToastrModule.forRoot(), // ToastrModule added

    // if you enabled service workers inside .angular-cli.json,
    // I suggest to use it, only for the production build
    // TO TEST SERVICE WORKERS IN YOUR BROWSER YOU MUST:
    // 1. build with `npm run build:prod` (not serve:prod)
    // 2. run with `lite-server`
    // 3. navigate the application
    // 4. disable network and cache from chrome dev tools (network tab)
    // 5. you should able to navigate the app and in chrome dev tools (network tab), all
    //    requests should come from service workers (not cache and not network)
    // I suggest also to check application tab -> Service Workers to see if is running or not
    ServiceWorkerModule.register('/ngsw-worker.js', {
      enabled: environment.production
    }),

    NgbModule.forRoot(), // forRoot ensures the providers are only created once

    /**
     * StoreModule.forRoot is imported once in the root module, accepting a reducer
     * function or object map of reducer functions. If passed an object of
     * mainReducers, combineReducers will be run creating your application
     * meta-reducer. This returns all providers for an @ngrx/store
     * based application.
     * TODO: find a way to add also developmentReducerFactory without breaking AOT
     */
    StoreModule.forRoot(mainReducers),

    /**
     * Store devtools instrument the store retaining past versions of state
     * and recalculating new states. This enables powerful time-travel
     * debugging.
     * To use the debugger, install the Redux Devtools extension for either
     * Chrome or Firefox
     * See: https://github.com/zalmoxisus/redux-devtools-extension
     */
    /**
     * This section will import the `StoreDevtoolsModule` only in certain build types.
     * When the module is not imported it will get tree shaked.
     * This is a simple example, a big app should probably implement some logic
     */
    ...(environment.showDevModule ? [StoreDevtoolsModule.instrument()] : []),

    CoreModule,
    SharedModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
