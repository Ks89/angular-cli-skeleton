import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';

import { AuthService } from './auth.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {
  }

  // use this https://github.com/auth0/angular2-jwt

  canActivate(): Observable<boolean> {
    if (localStorage.getItem('currentUser')) {
      // logged in so return true
      return of(true);
    }

    // not logged in so redirect to login page
    this.router.navigate(['/']);
    return of(false);

    // read local storage and decide if it is logged in or not
    // otherwise, call: "this.router.navigate(['/']);" to login again
  }
}
