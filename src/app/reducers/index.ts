// based on https://github.com/ngrx/platform/blob/48a2381c212d5dd3fa2b9435776c1aaa60734235/example-app/app/reducers/index.ts

/*
 * MIT License
 *
 * Copyright (c) 2017 Stefano Cappa
 * Copyright (c) 2017 Brandon Roberts, Mike Ryan, Victor Savkin, Rob Wormald
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
import { ActionReducerMap, compose, ActionReducer, combineReducers, Action, ActionReducerFactory } from '@ngrx/store';

import * as fromHelloExample from '../core/reducers/hello-example';

/**
 * As mentioned, we treat each reducer like a table in a database. This means
 * our top level state interface is just a map of keys to inner state types.
 */
export interface State {
  helloExample: fromHelloExample.State;
}

/**
 * Our state is composed of a map of action reducer functions.
 * These reducer functions are called with each dispatched action
 * and the current or initial state and return a new immutable state.
 */
export const mainReducers: ActionReducerMap<State> = {
  helloExample: fromHelloExample.reducer,
};

/**
 * Logger function to log state and actions in console
 * @param {ActionReducer<State>} reducer
 * @returns {(state: State, action: any) => State}
 */
export function logger(reducer: ActionReducer<State>) {
  return function(state: State, action: any) {
    console.log('state', state);
    console.log('action', action);
    return reducer(state, action);
  };
}

/**
 * The compose function is one of our most handy tools. In basic terms, you give
 * it any number of functions and it returns a function. This new function
 * takes a value and chains it through every composed function, returning
 * the output.
 *
 * More: https://drboolean.gitbooks.io/mostly-adequate-guide/content/ch5.html
 */
/**
 * combineReducers is another useful metareducer that takes a map of reducer
 * functions and creates a new reducer that gathers the values
 * of each reducer and stores them using the reducer's key. Think of it
 * almost like a database, where every reducer is a table in the db.
 *
 * More: https://egghead.io/lessons/javascript-redux-implementing-combinereducers-from-scratch
 */
/**
 * By default, @ngrx/store uses combineReducers with the reducer map to compose the root meta-reducer.
 * To add more meta-mainReducers, provide a custom reducer factory.
 */
export const developmentReducerFactory: ActionReducerFactory<State, Action> = compose(logger, combineReducers);
