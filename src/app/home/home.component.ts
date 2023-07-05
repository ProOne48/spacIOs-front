import { Component } from '@angular/core';
import { Router } from "@angular/router";
import { AuthService } from "../../services/auth/auth.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  user = AuthService.getSpaceOwnerData();

  constructor(
    private authService: AuthService,
    private router: Router
  ) {
  }
}
