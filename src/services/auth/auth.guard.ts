import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { AuthService } from './auth.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private auth: AuthService, private router: Router) {}
  public canActivate(route: ActivatedRouteSnapshot, { url }: RouterStateSnapshot): boolean {
    if (!this.auth.loggedIn()) {
      this.router.navigateByUrl('/login');
    }

    return true;
  }
}
