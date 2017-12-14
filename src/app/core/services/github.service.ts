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

/* tslint:disable:max-classes-per-file variable-name */

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

export class GithubUser {
  constructor(
    public login: string,
    public id: number,
    public url: string,
    public repos_url: string,
    public name: string | void,
    public company: string | void,
    public location: string | void
  ) {}
}

export class GithubOrg {
  constructor(
    public login: string | void,
    public id: number | void,
    public url: string | void,
    public repos_url: string | void,
    public events_url: string | void,
    public hooks_url: string | void,
    public issues_url: string | void,
    public members_url: string | void,
    public public_members_url: string | void,
    public avatar_url: string | void,
    public description: string | void,
  ) {}
}

/**
 * Example of a service to retrieve remote data from https://api.github.com/users/Ks89
 */
@Injectable()
export class GithubService {

  constructor(private httpClient: HttpClient) {}

  /**
   * Method to get my Github profile asynchronously using Github's apis.
   * @returns A Observable<GithubUser> with data inside.
   */
  getGithubUser(): Observable<GithubUser> {
    return this.httpClient.get<GithubUser>('https://api.github.com/users/Ks89');
  }

  /**
   * Method to get all organizations of my Github profile asynchronously using Github's apis.
   * @returns A Observable<GithubUser> with data inside.
   */
  getGithubKs89Organizations(): Observable<GithubOrg> {
    return this.httpClient.get<GithubOrg>('https://api.github.com/users/Ks89/orgs');
  }

}
