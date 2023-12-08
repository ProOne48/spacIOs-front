import { Component, Input, OnInit } from '@angular/core';
import { NavbarItemInterface, navbarItems } from '../../../definitions/navbar.interface';
import { NavigationEnd, Router } from '@angular/router';
import { AuthService } from '../../../services/auth/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  @Input() navbarItems?: NavbarItemInterface[];

  constructor(private router: Router, private authService: AuthService) {}

  logout(): void {
    this.authService.logout();
    this.navbarItems = navbarItems.filter((item) => item.show());
  }

  ngOnInit(): void {
    this.navbarItems = navbarItems.filter((item) => item.show());

    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.navbarItems = navbarItems.filter((item) => item.show());
      }
    });
  }

  get isLogged(): boolean {
    return !!AuthService.getSpaceOwnerData();
  }
}
