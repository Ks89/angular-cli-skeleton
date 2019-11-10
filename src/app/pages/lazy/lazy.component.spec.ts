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

import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { Observable, of } from 'rxjs/';

import { LazyComponent } from './lazy.component';
import { SharedModule } from '../../shared/shared.module';
import { CoreModule } from '../../core/core.module';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { StoreModule } from '@ngrx/store';
import { reducers } from './reducers';
import { metaReducers } from '../../reducers';
import { GithubOrg, GithubService, GithubUser } from '../../core/services/github.service';
import { ExampleService, MessageResponse } from '../../core/services/example.service';

let comp: LazyComponent;
let fixture: ComponentFixture<LazyComponent>;

describe('LazyComponent', () => {
  beforeEach(async(() => {

    TestBed.configureTestingModule({
      imports: [NgbModule, SharedModule, CoreModule, HttpClientTestingModule,
        StoreModule.forRoot(metaReducers, {reducerFactory: undefined}), StoreModule.forFeature('pageNum', reducers)],
      declarations: [LazyComponent]
    }).overrideComponent(LazyComponent, {
      set: {
        providers: [
          {provide: ExampleService, useClass: FakeExampleService },
          {provide: GithubService, useClass: FakeGithubService}
        ]
      }
    }); // not necessary with webpack .compileComponents();

    fixture = TestBed.createComponent(LazyComponent);
    comp = fixture.componentInstance;

    fixture.detectChanges();
    return fixture.whenStable().then(() => fixture.detectChanges());
  }));

  it('can instantiate it', () => expect(comp).not.toBeNull());

  describe('---YES---', () => {
    beforeEach(() => fixture.detectChanges());

    it('should display the lazy page', () => {
      const element: DebugElement = fixture.debugElement;

      const title: DebugElement[] = element.queryAll(By.css('h1'));
      expect(title.length).toBe(2);
      expect(title[0].nativeElement.textContent.trim()).toBe('LAZY');

      const message: DebugElement[] = element.queryAll(By.css('small'));
      expect(message.length).toBe(2); // because pageHeader has a <small> tag in its template
      expect(message[0].nativeElement.textContent.trim()).toBe('');
      expect(message[1].nativeElement.textContent.trim()).toBe('Lazy loaded module');
    });
  });
});

class FakeExampleService {
  getExample(): Observable<MessageResponse> {
    return of(<MessageResponse>{message: 'ok'});
  }
}

class FakeGithubService {
  getGithubUser(): Observable<GithubUser> {
    return of(<GithubUser>{
      login: 'a',
      id: 1,
      url: 'b',
      repos_url: 'c',
      name: 'd',
      company: 'e',
      location: 'f'
    });
  }

  getGithubKs89Organizations(): Observable<GithubOrg> {
    return of(<GithubOrg>{
      login: 'a',
      id: 1,
      url: 'a',
      repos_url: 'a',
      events_url: 'a',
      hooks_url: 'a',
      issues_url: 'a',
      members_url: 'a',
      public_members_url: 'a',
      avatar_url: 'a',
      description: 'a'
    });
  }
}
