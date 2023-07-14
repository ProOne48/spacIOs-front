import { Component, Input } from '@angular/core';
import { NavbarItemInterface, navbarItems } from '../../definitions/navbar.interface';
import { AuthService } from '../../services/auth/auth.service';
import { Router } from '@angular/router';
import { SocialAuthService } from '@abacritt/angularx-social-login';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  @Input() navbarItems: NavbarItemInterface[] = navbarItems;

  constructor(private router: Router, private authService: AuthService, private socialAuthService: SocialAuthService) {}

  logout(): void {
    this.authService.logout();
    this.socialAuthService.signOut();
    this.router.navigate(['/login']);
  }

  protected readonly authServiceClass = AuthService;
}
