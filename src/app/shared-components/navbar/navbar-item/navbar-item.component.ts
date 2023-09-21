import {Component, Input} from '@angular/core';
import {NavbarItemInterface} from "../../../../definitions/navbar.interface";

@Component({
  selector: 'app-navbar-item',
  templateUrl: './navbar-item.component.html',
  styleUrls: ['./navbar-item.component.scss']
})
export class NavbarItemComponent {

  @Input() item!: NavbarItemInterface
}
