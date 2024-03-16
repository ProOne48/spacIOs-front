import { Component, Input, OnInit } from '@angular/core';
import { NavbarItemInterface, navbarItems } from '../../../definitions/navbar.interface';
import { NavigationEnd, Router } from '@angular/router';
import { AuthService } from '../../../services/auth/auth.service';
import { rotate180Animation } from '../../../utils/animations';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  animations: [rotate180Animation]
})
export class NavbarComponent implements OnInit {
  @Input() navbarItems?: NavbarItemInterface[];

  menuOpen = false;

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

  toggleMenu(): void {
    this.menuOpen = !this.menuOpen;
  }
}
