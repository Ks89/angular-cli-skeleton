/*
 * MIT License
 *
 * Copyright (c) 2017-2018 Stefano Cappa
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

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';

/**
 * Example of an Angular Service
 */
@Injectable()
export class ExampleService {
  constructor() {}

  /**
   * Method to get example data synchronously.
   * @returns An Observable<string> with data inside.
   */
  getExample(): Observable<any> {
    return of(true);

    // TODO I'll implement this feature (authentication) in upcoming releases
    // const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    // const token = currentUser && currentUser.token;
    //
    // // add authorization header with jwt token
    // const headers = new Headers({'Authorization': 'Bearer ' + token});
    // const options = new RequestOptions({headers: headers});
    //
    // // get users from api
    // return this.http.get('/api/secret', options).map((response: Response) => response.json());
  }
}
