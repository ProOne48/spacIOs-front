import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MaterialModule } from '@modules/angular/material.module';

import { NavbarItemInterface } from '../../../../definitions/navbar.interface';

@Component({
  selector: 'app-navbar-item',
  imports: [MaterialModule, RouterLink],
  templateUrl: './navbar-item.component.html',
  styleUrls: ['./navbar-item.component.scss']
})
export class NavbarItemComponent {
  @Input() item!: NavbarItemInterface;
}
