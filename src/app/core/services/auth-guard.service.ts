import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable, of } from 'rxjs';

import { AuthService } from './auth.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): Observable<boolean> {
    if (this.authService.isLoggedIn()) {
      // already logged in so return true
      return of(true);
    }

    // not logged in so redirect to login page
    this.router.navigate(['/']);
    return of(false);
  }
}
