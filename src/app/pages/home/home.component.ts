/*
 * MIT License
 *
 * Copyright (c) 2017 Stefano Cappa
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

import { Component, OnDestroy, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/delay';
import { Subscription } from 'rxjs/Subscription';

import { PageHeader } from '../../shared/components/components';
import { ExampleService } from '../../core/services/example.service';
import { GithubService, GithubOrg } from '../../core/services/github.service';

import { Store } from '@ngrx/store';
import * as fromRoot from '../../core/reducers/hello-example';
import * as example from '../../core/actions/hello-example';

/**
 * Component with features, template and so on. This is the
 * component used to display the home page of the app SPA.
 */
@Component({
  selector: 'mmw-home-page',
  styleUrls: ['home.scss'],
  templateUrl: 'home.html'
})
export class HomeComponent implements OnInit, OnDestroy {
  pageHeader: PageHeader;
  message: string;
  elements: any[] = [
    {field: 'el1'},
    {field: 'el2'},
    {field: 'el3'}
  ];

  helloExample$: Observable<string>;
  elementsObs: Observable<any> = Observable.of(this.elements).delay(1000);

  private githubSubscription: Subscription;

  constructor(private exampleService: ExampleService,
              private githubService: GithubService,
              private store: Store<fromRoot.State>) {

    this.pageHeader = new PageHeader('KS', 'Welcome');
    this.message = 'Welcome to my website';

    // example of ngrx-store's usage
    // If you want, you can subscribe to this Observable to log 'message' saved
    // inside ngrx-store, thanks to this.store.dispatch.
    this.helloExample$ = this.store.select(fromRoot.getHelloExample);
  }

  ngOnInit() {
    console.log('Init called - say hello!');
    // dispatch an action to send the 'hello' message
    this.store.dispatch(new example.SayHelloAction());

    // call a REST service with fixed data
    this.exampleService.getExample().subscribe((val: string) => {
      console.log(`Result of getExample ${val}`);
    });

    // call a real REST service by Github
    // This is an example of HttpClient (Angular 4.3.0 or greater)
    this.githubSubscription = this.githubService.getGithubKs89Organizations().subscribe(
      (val: GithubOrg) => {
        console.log('Github organizations of Ks89', val);
      },
      (err: HttpErrorResponse) => {
        console.log('Error while calling Github apis for user Ks89', err);
        if (err.error instanceof Error) {
          // A client-side or network error occurred. Handle it accordingly.
          console.error('An error occurred:', err.error.message);
        } else {
          // The backend returned an unsuccessful response code.
          // The response body may contain clues as to what went wrong,
          console.error(`Backend returned code ${err.status}, body was: ${err.error}`);
        }
      }
    );

  }

  ngOnDestroy() {
    console.log('Destroy called - say bye bye!');

    // dispatch an action to send the 'bye bye' message
    this.store.dispatch(new example.SayByeByeAction());

    // unsubscribe to all Subscriptions to prevent memory leaks and wrong behaviour
    if (this.githubSubscription) {
      this.githubSubscription.unsubscribe();
    }
  }
}
