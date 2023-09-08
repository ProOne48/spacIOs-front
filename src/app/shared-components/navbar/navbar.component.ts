import {ChangeDetectorRef, Component, Input, OnChanges} from '@angular/core';
import { NavbarItemInterface, navbarItems } from '../../../definitions/navbar.interface';
import { AuthService } from '../../../services/auth/auth.service';
import { Router } from '@angular/router';
import { SocialAuthService } from '@abacritt/angularx-social-login';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnChanges {
  @Input() navbarItems: NavbarItemInterface[] = navbarItems;

  constructor(
    private router: Router,
    private authService: AuthService,
    private socialAuthService: SocialAuthService,
    private changeRef: ChangeDetectorRef
    ) {}

  logout(): void {
    this.authService.logout();
    this.socialAuthService.signOut();
    this.router.navigateByUrl('/login');
  }

  ngOnChanges(): void {
    this.changeRef.detectChanges();
  }

  protected readonly authServiceClass = AuthService;
}
