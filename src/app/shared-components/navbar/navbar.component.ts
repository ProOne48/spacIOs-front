import {ChangeDetectorRef, Component, Input, OnChanges, OnInit} from '@angular/core';
import { NavbarItemInterface, navbarItems } from '../../../definitions/navbar.interface';
import { AuthService } from '../../../services/auth/auth.service';
import {NavigationEnd, Router} from '@angular/router';
import { SocialAuthService } from '@abacritt/angularx-social-login';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  @Input() navbarItems?: NavbarItemInterface[]

  isLogged = AuthService.getSpaceOwnerData()

  constructor(
    private router: Router,
    private authService: AuthService,
    private socialAuthService: SocialAuthService
  ) {}

  logout(): void {
    this.authService.logout();
    this.socialAuthService.signOut();
    this.router.navigateByUrl('/login');
  }

  ngOnInit(): void {
    this.navbarItems = navbarItems.filter((item) => item.show);

    this.router.events.subscribe((event) => {
      if(event instanceof NavigationEnd) {
        this.navbarItems = navbarItems.filter((item) => item.show);
      }
    });
  }


}
