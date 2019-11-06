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

import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';

import { PageHeader } from '../../shared/components/components';
import { ExampleService } from '../../core/services/example.service';

import { Store, select } from '@ngrx/store';
import * as fromPageNum from './reducers';
import { setPageNum } from './actions/page-num.actions';

console.log('`Lazy` component loaded asynchronously');

/**
 * Component of the lazy loaded module for the app SPA
 */
@Component({
  selector: 'app-lazy-page',
  templateUrl: 'lazy.html',
  styleUrls: ['lazy.scss']
})
export class LazyComponent implements OnInit, OnDestroy {
  pageHeader: PageHeader;

  private pageNum$: Observable<number>;
  private pageNumSubscription: Subscription;
  private exampleServiceSubscription: Subscription;

  constructor(private exampleService: ExampleService, private store: Store<fromPageNum.State>) {
    this.pageHeader = new PageHeader('LAZY', '');

    this.pageNum$ = this.store.pipe(select(fromPageNum.getPageNum));

    // example of ngrx-store's usage
    // subscribe to pageNum (a number, for instance the current page of a table with pagination)
    // initially is 0, after it will be 4 (see below) -> this is only an example for demonstration purpose
    this.pageNumSubscription = this.pageNum$.subscribe((val: number) => {
      console.log(`Page num retrieved from ngrx-store is ${val}`);
    });
  }

  ngOnInit() {
    // call a service and dispatch an action to ngrx to trigger a new event into pageNum$ Observable
    this.exampleServiceSubscription = this.exampleService.getExample().subscribe((val: any) => {
      console.log(`Result of getExample`, val);

      // dispatch the setPageNum action with '4' as payload
      this.store.dispatch(setPageNum({ payload: 4 })); // I chose a constant value for this example :)
    });
  }

  ngOnDestroy() {
    console.log('Destroy called');

    // unsubscribe to all Subscriptions to prevent memory leaks and wrong behaviour
    if (this.pageNumSubscription) {
      this.pageNumSubscription.unsubscribe();
    }
    if (this.exampleServiceSubscription) {
      this.exampleServiceSubscription.unsubscribe();
    }
  }
}
