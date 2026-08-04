import { Injectable, inject } from '@angular/core';
import { ActivatedRouteSnapshot, Router } from '@angular/router';

import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard {
  private auth = inject(AuthService);
  private router = inject(Router);

  public canActivate(_route: ActivatedRouteSnapshot): boolean {
    if (!this.auth.loggedIn()) {
      this.router.navigate(['/login']);
    }

    return true;
  }
}
