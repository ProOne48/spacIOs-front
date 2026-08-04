import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class ActiveSessionGuard {
  private authService = inject(AuthService);
  private router = inject(Router);

  canActivate(): boolean {
    if (this.authService.loggedIn()) {
      this.router.navigate(['']);
    }

    return true;
  }
}
