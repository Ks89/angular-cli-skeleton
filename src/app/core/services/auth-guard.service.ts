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
    // read local storage and decide if it is logged in or not
    // otherwise, call: "this.router.navigate(['/']);" to login again
    return of(true);
  }
}
