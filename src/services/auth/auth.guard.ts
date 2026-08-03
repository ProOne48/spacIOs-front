import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router } from '@angular/router';

import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard {
  constructor(private auth: AuthService, private router: Router) {}
  public canActivate(_route: ActivatedRouteSnapshot): boolean {
    if (!this.auth.loggedIn()) {
      this.router.navigate(['/login']);
    }

    return true;
  }
}
