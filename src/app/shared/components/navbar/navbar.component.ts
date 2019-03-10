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

import { Component, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';

import { Subscription } from 'rxjs';

import { AuthService } from '../../../core/services/auth.service';
import { ToastrService } from 'ngx-toastr';

/**
 * Navbar of your application with the main horizontal menu
 */
@Component({
  selector: 'app-navigation',
  templateUrl: 'navbar.html',
  styleUrls: ['navbar.scss']
})
export class NavbarComponent implements OnDestroy {
  private logoutSubscription: Subscription;

  constructor(private router: Router, private authService: AuthService, private toastr: ToastrService) {}

  isNavItemActive(location: any) {
    return location === this.router.url ? 'active' : '';
  }

  isLoggedIn(): boolean {
    return this.authService.isLoggedIn();
  }

  onLogout() {
    this.logoutSubscription = this.authService.logout().subscribe(
      (resp: any) => {
        this.toastr.success('Bye bye!', 'Logout successful', { closeButton: true });
        this.router.navigate(['/']);
      },
      err => {
        this.toastr.error('Impossible to logout!', 'Logout', { closeButton: true });
      }
    );
  }

  ngOnDestroy() {
    if (this.logoutSubscription) {
      this.logoutSubscription.unsubscribe();
    }
  }
}
