import { Component, Input, OnInit, inject } from '@angular/core';
import { provideAnimations } from '@angular/platform-browser/animations';
import { NavigationEnd, Router } from '@angular/router';
import { MaterialModule } from '@modules/angular/material.module';

import { NavbarItemInterface, navbarItems } from '../../../definitions/navbar.interface';
import { AuthService } from '../../../services/auth/auth.service';
import { rotate180Animation } from '../../../utils/animations';

import { NavbarItemComponent } from './navbar-item/navbar-item.component';

@Component({
  selector: 'app-navbar',
  imports: [MaterialModule, NavbarItemComponent],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  animations: [rotate180Animation]
})
export class NavbarComponent implements OnInit {
  private router = inject(Router);
  private authService = inject(AuthService);

  @Input() navbarItems?: NavbarItemInterface[];

  menuOpen = false;

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
