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

import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { isPlatformBrowser } from '@angular/common';

import { Observable } from 'rxjs/Observable';
import { tap } from 'rxjs/operators';

export interface User {
  username: string;
  password: string;
}

export interface AuthResponse {
  message?: string;
  token?: string;
}

const TOKEN_NAME = 'token';

@Injectable()
export class AuthService {
  token: string;

  constructor(private http: HttpClient, @Inject(PLATFORM_ID) private platformId: Object) {
    // get existing token from local storage (if available/previously logged in)
    this.token = this.getToken();
  }

  isLoggedIn(tokenName: string = TOKEN_NAME): boolean {
    if (isPlatformBrowser(this.platformId)) {
      return !!localStorage.getItem(tokenName);
    } else {
      return false;
    }
  }

  getToken(tokenName: string = TOKEN_NAME): string | null {
    if (isPlatformBrowser(this.platformId)) {
      return localStorage.getItem(tokenName);
    } else {
      return null;
    }
  }

  setToken(token: string, tokenName: string = TOKEN_NAME) {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem(tokenName, token);
    }
  }

  removeToken(tokenName: string = TOKEN_NAME) {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem(tokenName);
    }
  }

  login(user: User): Observable<AuthResponse> {
    return this.http.post<AuthResponse>('/api/login', user).pipe(
      tap((resp: AuthResponse) => {
        // login successful if there's a jwt token in the response
        const token = resp.token;
        if (token) {
          this.token = token;
          // store token in local storage to keep user logged in
          this.setToken(token);
        }
      })
    );
  }

  logout(): Observable<AuthResponse> {
    return this.http.get<AuthResponse>('/api/logout', { headers: this.getAuthHeaders() }).pipe(tap(() => this.removeToken()));
  }

  getAuthHeaders(): HttpHeaders {
    let headers = new HttpHeaders();
    headers = headers.set('Authorization', 'Bearer ' + this.getToken());
    return headers;
  }
}
