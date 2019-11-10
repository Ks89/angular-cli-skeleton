// MIT License
//
// Copyright (c) 2017-2019 Stefano Cappa
//
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:
//
// The above copyright notice and this permission notice shall be included in all
// copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
// SOFTWARE.

export const db = [
  {
    credential: {
      id: 1,
      username: 'admin',
      password: 'password'
    },
    somethingelse: ''
  },
  {
    credential: {
      id: 2,
      username: 'admin',
      password: 'admin'
    },
    somethingelse: ''
  }
];

export interface Credential {
  id: number;
  username: string;
  password: string;
}

export interface Db {
  credential: Credential;
  somethingelse: string;
}

export interface Token {
  userId: number;
  token: string;
}

// Don't use a const here!
// this is a private variable.
// To access to 'tokens' use get, set and remove to prevent issues
export let tokens: Token[] = [];

export function getTokens(): Token[] {
  return tokens;
}

export function setTokens(newTokens: Token[]) {
  tokens = newTokens;
}

export function removeTokens() {
  tokens = [];
}
