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

/* tslint:disable:max-classes-per-file */

// This file is used into ../../reducers/index.ts

import { Action, createReducer, on } from '@ngrx/store';

import * as HelloExampleActions from '../actions/hello-example.actions';

export const helloKey = 'helloExample';

export interface State {
  message: string;
}

const initialState: State = {
  message: ''
};

const helloExampleReducer = createReducer(
  initialState,
  on(HelloExampleActions.sayHello, state => ({
    message: 'bye bye!'
  })),
  on(HelloExampleActions.sayByeBye, state => ({
    message: 'hello!'
  }))
);

// required to support AOT
export function reducer(state: State | undefined, action: Action) {
  return helloExampleReducer(state, action);
}
