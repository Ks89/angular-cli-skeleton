import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HttpClientXsrfModule } from '@angular/common/http';
import { ServiceWorkerModule } from '@angular/service-worker';
import { RouterModule } from '@angular/router';

import { ToastrModule } from 'ngx-toastr';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { ROOT_REDUCERS, metaReducers } from './reducers';

// ************************ optional font-awesome 5 ************************
// to install use both `npm i --save @fortawesome/fontawesome-svg-core` and `npm i --save @fortawesome/free-solid-svg-icons`
import { library, dom } from '@fortawesome/fontawesome-svg-core';
import { faExternalLinkAlt, faPlus, faTimes, faDownload } from '@fortawesome/free-solid-svg-icons';
library.add(faExternalLinkAlt, faPlus, faTimes, faDownload);
dom.watch(); // Kicks off the process of finding <i> tags and replacing with <svg>
// *************************************************************************

import { environment } from '../environments/environment';

import { AppRoutingModule } from './app-routing.module';
import { SharedModule } from './shared/shared.module';
import { CoreModule } from './core/core.module';
import { COMPONENTS } from './pages/components';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [AppComponent, COMPONENTS],
  imports: [
    // Add .withServerTransition() to support Universal rendering.
    // The application ID can be any identifier which is unique on
    // the page.
    BrowserModule.withServerTransition({ appId: 'my-app' }),
    BrowserAnimationsModule,

    HttpClientModule,
    HttpClientXsrfModule.withOptions(),

    FormsModule,
    ReactiveFormsModule,
    RouterModule,

    NgbModule,
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
    ServiceWorkerModule.register('/ngsw-worker.js', { enabled: environment.production }),

    // third party (ngrx)
    StoreModule.forRoot(ROOT_REDUCERS, {
      metaReducers,
      runtimeChecks: {
        strictStateImmutability: true,
        strictActionImmutability: true,
        strictStateSerializability: true,
        strictActionSerializability: true
      }
    }),
    StoreDevtoolsModule.instrument({
      name: 'Ks89 example App',
      logOnly: environment.production
    }),

    CoreModule,
    SharedModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
